import { Request } from "express";
import { UserDocument } from "../models/User";

export type ExpenseApi = {
  date: string;
  amount: number;
  item: string;
  type?: string;
};

export type RegisterApi = {
  email: string;
  password: string;
};
