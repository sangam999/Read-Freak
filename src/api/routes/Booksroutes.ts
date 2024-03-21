import { Request, Response, Router } from 'express';
import { BookService } from '../../services/Bookservices';
import {auth} from "../middlewear/Auth";
import {adminAuthMiddleware} from "../middlewear/adminAuthMiddleware";
import IBooksPage from "../../interfaces/IBooksPage";

const bookService = new BookService();

export default (app: Router) => {
    app.get('/getAllBooks', async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const booksData :IBooksPage= req.body
            if (!booksData) {
                res.status(404).json({ message: 'Books not found' });
                return;
            }
            res.json(booksData);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({ message: error.message });
        }
    });

    app.post("/addbooks/:id",adminAuthMiddleware, async (req, res) => {
        const { title, author, year, genre } = req.body;
        const book = await bookService.addBook(title, author, year, genre);
        res.json(book);
    });

    app.post("/updatebooks/:id",adminAuthMiddleware, async (req, res) => {
        const id = req.params.id;
        const book = await bookService.updateBook(id, req.body);
        res.json(book);
    });

    app.get("/deletebooks/:id",adminAuthMiddleware, async (req, res) => {
        const id: string = req.params.id;

        try {
            const book = await bookService.deleteBook(id);
            res.send(book.message);
        } catch (e) {
            res.send("Invalid Request")
        }
    });

    // Add route for searching books
    app.get("/books/search", async (req, res) => {
        const { query } = req.query;
        const books = await bookService.searchBooks(query as string);
        res.json(books);
    });
}