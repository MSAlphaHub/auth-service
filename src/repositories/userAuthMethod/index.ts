import { Knex } from "knex";
import { IUserAuthMethod } from "../../types";
import db from "../../database";

class UserAuthMethodRepository {
  async getAuthDataByIdentifier(identifier: string) {
    return db
      .getConnection()("user_auth_method")
			.select("auth_data")
      .where({ identifier })
      .first();
  }

  async createAuthMethod(authMethod: IUserAuthMethod, trx?: Knex.Transaction) {
    return trx
      ? db
          .getConnection()("user_auth_method")
          .transacting(trx)
          .insert({
            user_id: authMethod.user_id,
            auth_method: authMethod.auth_method,
            identifier: authMethod.identifier,
            auth_data: authMethod.auth_data,
          })
          .returning([
            "id",
            "user_id",
            "auth_method",
            "identifier",
            "create_by",
            "created_at",
          ])
          .then((rows) => rows[0])
      : db
          .getConnection()("user_auth_method")
          .insert({
            user_id: authMethod.user_id,
            auth_method: authMethod.auth_method,
            identifier: authMethod.identifier,
            auth_data: authMethod.auth_data,
          })
          .returning([
            "id",
            "user_id",
            "auth_method",
            "identifier",
            "create_by",
            "created_at",
          ])
          .then((rows) => rows[0]);
  }
}

export default new UserAuthMethodRepository();
