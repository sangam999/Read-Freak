import express, {Request, Response, NextFunction, Router} from 'express';
import { BookService } from "../../services/Bookservices";
import { AuthService } from "../../services/authServices";

import {adminAuthMiddleware} from "../middlewear/adminAuthMiddleware";
import {UserService} from "../../services/userServices";

const app = express();
const authService = new AuthService();
const userServices = new UserService();

app.use(express.json());

// Auth Router
export default (app: Router) => {

// Sign-up Route
    app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, password, email} = req.body;
            const user = await authService.signUp(username, password, email);
            res.json({user});
        } catch (error) {
            next(error);
        }
    });

// Login Route
    app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;
            const token = await authService.login(email, password);
            res.json({token});
        } catch (error) {
            next(error);
        }
    });

// Activate User
    app.put('/user/:id/activate', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            await userServices.activateUser(userId);
            res.json({message: `User with ID ${userId} activated successfully`});
        } catch (error) {
            next(error);
        }
    });

// Deactivate User
    app.put('/user/:id/deactivate', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            await userServices.deactivateUser(userId);
            res.json({message: `User with ID ${userId} deactivated successfully`});
        } catch (error) {
            next(error);
        }
    });


// Error Handler Middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        res.status(500).json({error: err.message});
    });

// Use Auth and Admin Routers
    app.use('/auth', Router);
    app.use('/admin', Router);

}
