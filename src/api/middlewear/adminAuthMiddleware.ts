import express, { Request, Response, NextFunction } from 'express';
import { AuthService } from "../../services/authServices";
import { ReqWithUser } from "../../interfaces/Ireq";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import {IUser} from "../../interfaces/IUser";

const app = express();
const authService = new AuthService(); // Initialize AuthService if not already initialized

// Admin Authentication Middleware
export const adminAuthMiddleware = async (req: ReqWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '') || req.body.token;
        if (!token) {
            throw new Error('Token not provided');
        }
        const decodedToken = jwt.verify(token, config.JWT_KEY as string) as IUser; // Assuming JWT_KEY is defined in config
        if (decodedToken.role != 'admin') {
            throw new Error('Unauthorized');
        }
        req.user = decodedToken; // Change decoded to decodedToken
        next();
    } catch (error) {
        next(error);
    }
};

// Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' }); // Handle error message properly
});

