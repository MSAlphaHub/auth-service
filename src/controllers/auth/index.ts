import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserAuthMethod } from "../../constants/enums";
import db from "../../database";
import userAuthMethodRepository from "../../repositories/userAuthMethod";
import userRepository from "../../repositories/users";
import tokenService from "../../services/tokens";
import userAuthMethodService from "../../services/userAuthMethod";
import {
  IUserAuthMethod,
  IUserAuthToken,
  IUserLoginWithEmailAndPassword,
  IUserRegister,
} from "../../types";
import apiResponse from "../../utils/api/response";
import { hashPassword } from "../../utils/auth";
import catchAsync from "../../utils/errors/catchAsync";
import { publishMessageVerifyEmail } from "../../queues/producer";
class AuthController {
  register = catchAsync(async (req: Request, res: Response) => {
    const trx = await db.getConnection().transaction();
    try {
      const payload = req.body as IUserRegister;
      // Create user
      const user = (await userRepository.createUser(
        payload,
        trx
      )) as IUserAuthToken;

      // Create auth method
      const hashedPassword = await hashPassword(payload.password);
      const userAuthMethod = {
        user_id: user.id,
        auth_method: UserAuthMethod.EMAIL_PASSWORD,
        identifier: payload.email,
        auth_data: hashedPassword,
      } as IUserAuthMethod;
      await userAuthMethodRepository.createAuthMethod(userAuthMethod, trx);

      // Create token
      const tokens = await tokenService.generateAuthTokens(user, trx);

      // Handle send message verify email
      await publishMessageVerifyEmail({
        email: payload.email,
        username: payload.userName,
        verificationLink: "",
      });

      trx.commit();
      return apiResponse.success(
        res,
        "Register success",
        { user, tokens },
        httpStatus.CREATED
      );
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });

  loginWithEmailAndPassword = catchAsync(
    async (req: Request, res: Response) => {
      const payload = req.body as IUserLoginWithEmailAndPassword;
      const user = await userAuthMethodService.loginWithEmailAndPassword(
        payload
      );
      const tokens = await tokenService.generateAuthTokens(user);

      return apiResponse.success(
        res,
        "Login success",
        { user, tokens },
        httpStatus.OK
      );
    }
  );
}

export default new AuthController();
