import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .then(() => logger.info(req.originalUrl))
      .catch((err) => next(err));
  };

module.exports = catchAsync;
