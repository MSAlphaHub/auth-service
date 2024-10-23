import userRepository from "../../repositories/users";
import userAuthMethodRepository from "../../repositories/userAuthMethod";
import { IUserAuthToken, IUserLoginWithEmailAndPassword } from "../../types";
import { comparePassword } from "../../utils/auth";
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status-codes";

class UserAuthMethodService {
  async loginWithEmailAndPassword(
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
}

export default new UserAuthMethodService();
