import { UUID } from "crypto";
import usersRepository from "../../repositories/users";
import { IUser } from "../../types";
import { Knex } from "knex";

class UserService {
  async findAllUsers() {
    return usersRepository.finAllUsers();
  }

  async findUserById(id: UUID) {
    return usersRepository.findUserById(id);
  }

  async createUser(user: Partial<IUser>, trx?: Knex.Transaction): Promise<IUser> {
    return usersRepository.createUser(user, trx);
  }
}

export default new UserService();
