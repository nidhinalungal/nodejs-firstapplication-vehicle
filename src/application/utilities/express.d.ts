// @types/express.d.ts

import { UserEntity } from "../../infrastructure/models/UserEntity";

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload | undefined;
        }
    }
}
