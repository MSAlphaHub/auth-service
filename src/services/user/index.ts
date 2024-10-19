import { UUID } from "crypto";
import usersRepository from "../../repositories/users";

class UserService {
	async findUserById(id: UUID) {
		return usersRepository.findUserById(id);
	}
}

export default new UserService();