import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    // req.user = user;  {
  // username: "nidhinalungal",
  // role: "Admin",
  // iat: 1721645697,
  // exp: 1721649297,
// }
    next(); 
  });
};
