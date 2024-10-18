import db from "../../database";

class UserRepository {
  async findUserById(id: string) {
    return db.getConnection()("users").where({ id }).first();
  }

  async createUser(userData: Types.IUser) {
    return db.getConnection()("users").insert(userData);
  }
}

export default new UserRepository();