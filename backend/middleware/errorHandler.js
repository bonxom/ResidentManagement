import { AppError } from "./AppError.js";
import { ERROR_CODE } from "./errorCode.js";

export const errorHandler = (err, req, res, next) => {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: ERROR_CODE.UNCATEGORIZED_EXCEPTION.code,
    message: ERROR_CODE.UNCATEGORIZED_EXCEPTION.message,
  });
};
