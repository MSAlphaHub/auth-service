import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import config from "../config";
import logger from "../config/logger";
import { EnumEnvironment } from "../constants/enums";
import ApiError from "../utils/errors/ApiError";

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus.getStatusText(statusCode);
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === EnumEnvironment.PRODUCTION && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR);
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === EnumEnvironment.DEVELOPMENT && { stack: err.stack }),
  };

  if (config.env === EnumEnvironment.DEVELOPMENT) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
