import { RegisterApi } from "../types/types";
import UserModel from "../models/User";
import ErrorHandler from "../utils/ErrorHandler";
import { log } from "util";

export const registerUserService = (userData: RegisterApi) => {
  return UserModel.create(userData);
};

export const loginUserService = async (userData: RegisterApi) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new ErrorHandler(400, "Please provide email and password");
  }

  const user = await UserModel.findOne({ email });
  
  if (!user) {
    throw new ErrorHandler(401, "Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorHandler(401, "Invalid credentials");
  }

  return user;
};
