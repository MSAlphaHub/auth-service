import { Moment } from "moment";
import db from "../../database";
import { ICreateToken, IToken } from "../../types";
import { TokenTypes } from "../../constants/enums";
import { UUID } from "crypto";

class TokensRepository {
  static async createToken({
    userId: userId,
    token,
    type,
    expires,
    blacklisted,
    trx,
  }: Partial<ICreateToken>): Promise<IToken> {
    return trx
      ? db
          .getConnection()("tokens")
          .transacting(trx)
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
          ])
      : db
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

  static async getToken(
    token: string,
    type: TokenTypes,
    userId: UUID,
    blacklisted?: boolean
  ): Promise<IToken> {
    return db
      .getConnection()("tokens")
      .select({
        id: "id",
        userId: "user_id",
        token: "token",
        type: "type",
        blacklisted: "blacklisted",
        expiresAt: "expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      })
      .where({ token, type, user_id: userId, blacklisted })
      .first();
  }

  static async setTokenIsBlacklisted(token: string) {
    db.getConnection()("tokens").update({ blacklisted: true }).where({ token });
  }

  static async checkTokenIsBlacklisted(
    token: string,
    type: TokenTypes,
    userId: UUID
  ): Promise<boolean> {
    return (await this.getToken(token, type, userId, true)) != null;
  }

  static async setTokenToBlacklisted(token: string, type: TokenTypes) {
    await db
      .getConnection()("tokens")
      .where({ token, type })
      .update({ blacklisted: true });
  }
}

export default TokensRepository;
