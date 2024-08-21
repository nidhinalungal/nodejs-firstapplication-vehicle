import { Request, Response, NextFunction } from "express";
import { IUserProps } from "../../handlers/dtos/IUserProps";

export function validateUserProps(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userProps: IUserProps = req.body;

  if (!userProps.name) {
    res.status(400).send({ error: "Name is required" });
    throw new Error("Name is required");
  }
  if (!userProps.username) {
    res.status(400).send({ error: "UserName is required" });
    throw new Error("UserName is required");
  }
  if (!userProps.password) {
    res.status(400).send({ error: "Password is required" });
    throw new Error( "Password is required");
  }
  if (!userProps.role) {
    res.status(400).send({ error: "Role is required" });
    throw new Error("Role is required");
  }

  next();
}
