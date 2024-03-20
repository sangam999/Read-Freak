import express, { Request, Response, NextFunction, ReqWithUser } from 'express';
import {AuthService} from "../../services/authServices";

const app = express();
const authService = new AuthService(); // Initialize AuthService if not already initialized

// Admin Authentication Middleware
 export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token not provided');
        }
        const decodedToken = await authService.verifyToken(token); // Assuming verifyToken method is defined in AuthService
        if (decodedToken.role !== 'admin') {
            throw new Error('Unauthorized');
        }
        req.user = decodedToken; // Assigning user data to the request for further use
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

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
