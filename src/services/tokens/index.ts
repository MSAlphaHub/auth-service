import { UUID } from "crypto";
import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import config from "../../config";
import { TokenTypes } from "../../constants/enums";
import TokensRepository from "../../repositories/tokens";
import { IJwtPayload, IToken, IUserAuthToken } from "../../types";
import { Knex } from "knex";

class TokenService {
  /**
   * Generate token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {string} [secret]
   * @returns {string}
   */
  generateToken = (
    userId: UUID,
    expires: Moment,
    type: TokenTypes,
    secret = config.jwt.secret
  ) => {
    const payload: IJwtPayload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };

  /**
   * Save a token
   * @param {string} token
   * @param {UUID} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  saveToken = async (
    token: string,
    userId: UUID,
    expires: Moment,
    type: TokenTypes,
    trx?: Knex.Transaction,
    blacklisted: boolean = false
  ): Promise<IToken> => {
    return await TokensRepository.createToken({
      token,
      userId,
      expires,
      type,
      blacklisted,
      trx,
    });
  };

  /**
   * Verifies a JWT token and retrieves the associated token document.
   *
   * @param {string} token - The JWT token to verify.
   * @returns {Promise<IToken | undefined>} The token document if verification is successful.
   * @throws {Error} If the token is not found.
   */
  verifyToken = async (token: string): Promise<IToken | undefined> => {
    const payload = jwt.verify(token, config.jwt.secret) as IJwtPayload;
    if (!payload) return;
    const tokenDoc = await TokensRepository.getToken(
      token,
      payload.type,
      payload.sub,
      false
    );
    if (!tokenDoc) {
      throw new Error("Token not found");
    }
    return tokenDoc;
  };

  generateAuthTokens = async (user: IUserAuthToken, trx?: Knex.Transaction) => {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = this.generateToken(
      user.id,
      accessTokenExpires,
      TokenTypes.ACCESS_TOKEN
    );

    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = this.generateToken(
      user.id,
      refreshTokenExpires,
      TokenTypes.REFRESH_TOKEN
    );
    await this.saveToken(
      refreshToken,
      user.id,
      refreshTokenExpires,
      TokenTypes.REFRESH_TOKEN,
      trx
    );

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };
}

export default new TokenService();
