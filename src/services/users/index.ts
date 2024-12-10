import { UUID } from "crypto";
import usersRepository from "../../repositories/users";
import { IUser } from "../../types";
import { Knex } from "knex";
import tokenService from "../tokens";
import { UserStatus } from "../../constants";
class UserService {
  static async findAllUsers() {
    return usersRepository.finAllUsers();
  }

  static async findUserById(id: UUID) {
    return usersRepository.findUserById(id);
  }

  static async findUserByEmail(email: string) {
    return usersRepository.findUserByEmail(email);
  }

  static async createUser(
    user: Partial<IUser>,
    trx?: Knex.Transaction
  ): Promise<IUser> {
    return usersRepository.createUser(user, trx);
  }

  static async updateUserStatus(
    userId: string,
    status: UserStatus,
    trx?: Knex.Transaction
  ) {
    return usersRepository.updateUserStatus(userId, status, trx);
  }

  static async isExistByEmailAndPending(email: string) {
    return usersRepository.isExistByEmailAndPending(email);
  }
}

export default UserService;
