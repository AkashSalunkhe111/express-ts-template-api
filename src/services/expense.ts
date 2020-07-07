import moment from "moment";
import { ExpenseApi } from "../types/types";
import ExpenseModel from "../models/Expense";
import ErrorHandler from "../utils/ErrorHandler";

export const postExpenseService = (expenseData: ExpenseApi) => {
  const expenseDataCopy: any = { ...expenseData };
  const momentDate = moment(expenseData.date, "DD/MM/YY", true);

  if (!momentDate.isValid()) {
    throw new ErrorHandler(503, "Please enter a valid date");
  }
  expenseDataCopy.date = momentDate.toDate();
  return ExpenseModel.create(expenseDataCopy);
};

export const getAllExpenseService = () => {
  // No need for await here as result variable is promise,
  // so we can await this function where we are callling it
  // Thats why this function is not async declared by us
  const result = ExpenseModel.find();
  return result;
};

export const getExpenseService = (id: string) => {
  // No need for await here as result variable is promise,
  // so we can await this function where we are callling it
  // Thats why this function is not async declared by us
  const result = ExpenseModel.find({ user: id });
  return result;
};
