import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Response, Request } from "express";

const errorHandler = (
  Error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(Error.code);

  switch (Error.code) {
    case 11000:
      Error.statusCode = 400;
      break;

    default:
      break;
  }

  res.status(Error.statusCode || 500).json({
    success: false,
    message: Error.message || "Server Error",
  });
  // Call next if there is some next middleware to be called
  // next()
};

export default errorHandler;
