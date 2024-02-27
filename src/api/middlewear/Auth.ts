import jwt from 'jsonwebtoken';
import {Response, NextFunction } from 'express';
import ReqWithUser from "../../interfaces/Ireq";
import config from "../../config/config";
import IUser from "../../interfaces/IUser";

const isAuth = (req: ReqWithUser, res: Response, next: NextFunction) => {

    let token: any;
    token = req.cookies.token || req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_KEY as string) as IUser;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export = isAuth;