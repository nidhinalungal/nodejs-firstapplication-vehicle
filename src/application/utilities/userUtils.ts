import { Request } from 'express';

export const getCurrentUser = (req: Request) => {
    if (!req.user) {
        throw new Error('User information not available in request');
    }
    return req.user;
};