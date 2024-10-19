import { UUID } from "crypto";
import userService from "../../services/user";
import { Request, Response } from "express";
import catchAsync from "../../utils/errors/catchAsync";
class UserController {
  findUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.query.id as UUID;
    const user = await userService.findUserById(userId);
    res.status(200).send(user);
  });
}

export default new UserController();
