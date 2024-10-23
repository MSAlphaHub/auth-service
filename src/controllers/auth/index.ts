import { Request, Response } from "express";
import catchAsync from "../../utils/errors/catchAsync";
import userRepository from "../../repositories/users";
import tokenService from "../../services/tokens";
import httpStatus from "http-status-codes";
import apiResponse from "../../utils/api/response";
import userAuthMethodService from "../../services/userAuthMethod";
import {
  IUserAuthMethod,
  IUserAuthToken,
  IUserLoginWithEmailAndPassword,
  IUserRegister,
} from "../../types";
import db from "../../database";
import { comparePassword, hashPassword } from "../../utils/auth";
import userAuthMethodRepository from "../../repositories/userAuthMethod";
import { UserAuthMethod } from "../../constants/enums";
import ApiError from "../../utils/errors/ApiError";
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
      // const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
      // await emailService.sendVerificationEmail(user.email, user.name, verifyEmailToken);
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
