import { Request, Response, NextFunction } from "express";
import {
  postExpenseService,
  getAllExpenseService,
  getExpenseService,
} from "../services/expense";
import ErrorHandler from "../utils/ErrorHandler";

export const testEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // throw new ErrorHandler(503, "Custom error");
  // throw Error("default");
  return next(new ErrorHandler(503, "Custom Error"));
  // res.send("Hello World");
};

export const getAllExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllExpenseService();
    res.status(200).json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

export const postExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.user = req.user?.id;
    await postExpenseService(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.user = req.user?.id;
    const result = await getExpenseService(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    next(err);
  }
};
