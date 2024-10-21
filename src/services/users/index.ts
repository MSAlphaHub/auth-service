import { UUID } from "crypto";
import usersRepository from "../../repositories/users";
import { IUser } from "../../types";

class UserService {
  async findAllUsers() {
    return usersRepository.finAllUsers();
  }

  async findUserById(id: UUID) {
    return usersRepository.findUserById(id);
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    return usersRepository.createUser(user);
  }
}

export default new UserService();
