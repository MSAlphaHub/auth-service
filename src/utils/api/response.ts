import { Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * @class ApiResponse
 * @classdesc A utility class for sending standardized API responses.
 * This class provides methods for sending success and error responses in a consistent format.
 */
class ApiResponse {
  /**
   * @desc    Send any success response
   *
   * @param   {string} message
   * @param   {object | array} data
   * @param   {number} statusCode
   */
  success = (
    response: Response,
    message: string | null,
    data: object,
    statusCode: StatusCodes
  ) => {
    response.status(statusCode).send({
      message,
      error: false,
      code: statusCode,
      data,
    });
  };

  /**
   * @desc    Send any error response
   *
   * @param   {string} message
   * @param   {number} statusCode
   */
  error = (response: Response, message: string, statusCode: StatusCodes) => {
    response.status(statusCode).send({
      message,
      error: true,
      code: statusCode,
      data: null,
    });
  };
}

export default new ApiResponse();
