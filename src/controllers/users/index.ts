import { pick } from "./../../utils/index";
import { UUID } from "crypto";
import userService from "../../services/users";
import { Request, Response } from "express";
import catchAsync from "../../utils/errors/catchAsync";
import httpStatus from "http-status-codes";
import apiResponse from "../../utils/api/response";
class UserController {
  findAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.findAllUsers();
    apiResponse.success(res, null, users, httpStatus.OK);
  });

  findUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id as UUID;
    const user = await userService.findUserById(userId);
    apiResponse.success(res, null, user, httpStatus.OK);
  });

  createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    await userService.createUser(user);
    apiResponse.success(res, "Create user success", user, httpStatus.CREATED);
  });
}

export default new UserController();
