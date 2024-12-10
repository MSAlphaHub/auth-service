import db from "../../database";
import { UUID } from "crypto";
import { IUser } from "../../types";
import { Knex } from "knex";
import { UserStatus } from "../../constants";

class UserRepository {
  static async finAllUsers() {
    return db.getConnection()("users").select({
      id: "id",
      userName: "user_name",
      firstName: "first_name",
      lastName: "last_name",
      dateOfBirth: "date_of_birth",
      phone: "phone",
      status: "status",
    });
  }

  static async findUserById(id: UUID) {
    return db.getConnection()("users").where({ id }).first();
  }

  static async findUserByEmail(email: string) {
    return db.getConnection()("users").where({ email }).first();
  }

  static async isExistByEmailAndPending(email: string): Promise<boolean> {
    return db
      .getConnection()("users")
      .where({ email, status: UserStatus.PENDING })
      .first();
  }

  static async createUser(
    user: Partial<IUser>,
    trx?: Knex.Transaction
  ): Promise<IUser> {
    return trx
      ? db
          .getConnection()("users")
          .transacting(trx)
          .insert({
            email: user.email,
            user_name: user.userName,
            first_name: user.firstName,
            last_name: user.lastName,
            date_of_birth: user.dateOfBirth,
            phone: user.phone,
            status: UserStatus.PENDING,
          })
          .returning([
            "id",
            "user_name AS userName",
            "first_name AS firstName",
            "last_name AS lastName",
            "date_of_birth AS dateOfBirth",
            "phone",
            "status",
          ])
          .then((rows) => rows[0])
      : db
          .getConnection()("users")
          .insert({
            email: user.email,
            user_name: user.userName,
            first_name: user.firstName,
            last_name: user.lastName,
            date_of_birth: user.dateOfBirth,
            phone: user.phone,
            status: UserStatus.PENDING,
          })
          .returning([
            "id",
            "user_name AS userName",
            "first_name AS firstName",
            "last_name AS lastName",
            "date_of_birth AS dateOfBirth",
            "phone",
            "status",
          ])
          .then((rows) => rows[0]);
  }

  static async updateUserStatus(
    userId: string,
    status: UserStatus,
    trx?: Knex.Transaction
  ) {
    return trx
      ? db
          .getConnection()("users")
          .transacting(trx)
          .where({ id: userId })
          .update({ status })
      : db.getConnection()("users").where({ id: userId }).update({ status });
  }
}

export default UserRepository;
