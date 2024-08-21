import { Request, Response, NextFunction } from "express";
import { IUserProps } from "../../handlers/dtos/IUserProps";
import { ILoginProps } from "../../handlers/dtos/ILoginProps";

export function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const loginProps: ILoginProps = req.body;

  if (!loginProps.username) {
    res.status(400).send({ error: "UserName is required" });
    throw new Error("UserName is required");
  }
  if (!loginProps.password) {
    res.status(400).send({ error: "Password is required" });
    throw new Error("Password is required");
  }

  next();
}
