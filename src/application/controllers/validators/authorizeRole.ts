import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }
    const decodedToken = jwt.decode(token) as { role?: string };
    if (role !== decodedToken.role) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};
