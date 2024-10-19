import db from "../../database";
import { UUID } from "crypto";
import { IUser } from "../../types";

class UserRepository {
  async findUserById(id: UUID) {
    return db.getConnection()("users").where({ id }).first();
  }

  async createUser(userData: IUser) {
    return db.getConnection()("users").insert(userData);
  }
}

export default new UserRepository();
