import userRepository from "../../repositories/users";
import userAuthMethodRepository from "../../repositories/userAuthMethod";
import {
  IUserAuthMethod,
  IUserAuthToken,
  IUserLoginWithEmailAndPassword,
} from "../../types";
import { comparePassword } from "../../utils/auth";
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status-codes";
import { Knex } from "knex";
import TokenService from "../tokens";
import UserService from "../users";
import { UserStatus } from "../../constants";

class UserAuthMethodService {
  static async create(authMethod: IUserAuthMethod, trx?: Knex.Transaction) {
    userAuthMethodRepository.createAuthMethod(authMethod, trx);
  }

  static async loginWithEmailAndPassword(
    payload: IUserLoginWithEmailAndPassword
  ): Promise<IUserAuthToken> {
    // TODO: check verify email
    const user = await userRepository.findUserByEmail(payload.email);
    const userAuthMethod =
      await userAuthMethodRepository.getAuthDataByIdentifier(payload.email);

    if (
      !user ||
      !(await comparePassword(payload.password, userAuthMethod.auth_data))
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }
    return user;
  }

  static async verifyEmail(token: string) {
    try {
      const data = await TokenService.verifyToken(token);
      // update user status
      await UserService.updateUserStatus(data?.userId, UserStatus.ACTIVE);
      await TokenService.setTokenToBlacklisted(data?.token!, data?.type);
    } catch (error) {
      throw error;
    }
  }
}

export default UserAuthMethodService;
