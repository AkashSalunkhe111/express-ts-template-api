import { NextFunction, Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerUserService(req.body);
    res.status(200).json({ success: "true" });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginUserService(req.body);
    const token = user.getSignedToken();
    const cookieOption = {
      expires: new Date(
        // @ts-ignore
        Date.now() + Number(process.env.COOKIE_EXPIRE)
      ),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", token, cookieOption)
      .json({ success: true, token: token });
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const cookieOption = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  res.cookie("token", "none", cookieOption);

  res.status(200).json({ success: true });
};
