import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ? req.headers.authorization : null;

  if (!token) {
    return next(new ErrorHandler(401, "Not Authorized"));
  }
  console.log(process.env.JWT_SECRET!);

  try {
    const decoded = <any>jwt.verify(token, process.env.JWT_SECRET!);

    req.user = await UserModel.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.log(err);

    return next(new ErrorHandler(401, "Not Authorized"));
  }
};

export default protect;
