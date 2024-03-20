import express, { Request, Response, NextFunction } from 'express';
import { BookService } from "../../services/Bookservices";
import { AuthService } from "../../services/authServices";

import {adminAuthMiddleware} from "../middlewear/adminAuthMiddleware";
import {UserService} from "../../services/userServices";

const app = express();
const authService = new AuthService();
const bookServices = new BookService();
const userServices = new UserService();

app.use(express.json());

// Auth Router
const authRouter = express.Router();

// Sign-up Route
authRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, email } = req.body;
        const user = await authService.signUp(username, password, email);
        res.json({ user });
    } catch (error) {
        next(error);
    }
});

// Login Route
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

// Admin Routes
const adminRouter = express.Router();

// Activate User
adminRouter.put('/user/:id/activate', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        await userServices.activateUser(userId);
        res.json({ message: `User with ID ${userId} activated successfully` });
    } catch (error) {
        next(error);
    }
});

// Deactivate User
adminRouter.put('/user/:id/deactivate', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        await userServices.deactivateUser(userId);
        res.json({ message: `User with ID ${userId} deactivated successfully` });
    } catch (error) {
        next(error);
    }
});

// Add Book
adminRouter.post('/books', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, year } = req.body;
        const book = await bookServices.addBook(title, author, year);
        res.json({ book });
    } catch (error) {
        next(error);
    }
});

// Delete Book
adminRouter.delete('/books/:id', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.id;
        await bookServices.deleteBook(bookId);
        res.json({ message: `Book with ID ${bookId} deleted successfully` });
    } catch (error) {
        next(error);
    }
});

// Update Book
adminRouter.put('/books/:id', adminAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.id;
        const { title, author, genre } = req.body;
        const updatedBook = await bookServices.updateBook(bookId, { title, author, genre });
        res.json({ updatedBook });
    } catch (error) {
        next(error);
    }
});

// Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

// Use Auth and Admin Routers
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
