import jwt from 'jsonwebtoken';
import {Response, Request, NextFunction } from 'express';
import config from "../../config/config";
import IUser from "../../interfaces/IUser";

export const auth = (req: Request, res: Response, next: NextFunction) => {

    let token: any;
    token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '') || req.body.token;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_KEY as string);
        // @ts-ignore
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

