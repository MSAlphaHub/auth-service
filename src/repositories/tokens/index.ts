import { Moment } from "moment";
import db from "../../database";
import { ICreateToken, IToken } from "../../types";
import { TokenTypes } from "../../constants/enums";
import { UUID } from "crypto";

class TokensRepository {
  async createToken({
    userId: userId,
    token,
    type,
    expires,
    blacklisted,
  }: Partial<ICreateToken>): Promise<IToken> {
    return db
      .getConnection()("tokens")
      .insert({
        user_id: userId,
        token,
        type,
        expires_at: expires.toDate(),
        blacklisted,
      })
      .returning([
        "id",
        "user_id",
        "token",
        "type",
        "expires_at",
        "blacklisted",
        "created_at",
        "updated_at",
      ]);
  }

  async getToken(
    token: string,
    type: TokenTypes,
    userId: UUID,
    blacklisted = false
  ): Promise<IToken> {
    return db
      .getConnection()("tokens")
      .select("*")
      .where({ token, type, user_id: userId, blacklisted })
      .first();
  }

  async setTokenIsBlacklisted(token: string) {
    db.getConnection()("tokens").update({ blacklisted: true }).where({ token });
  }
}

export default new TokensRepository();
