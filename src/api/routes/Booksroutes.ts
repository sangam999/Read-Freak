import { Request, Response, Router } from 'express';
import { BookService } from '../../services/Bookservices';
import {auth} from "../middlewear/Auth";

const bookService = new BookService();

export default (app: Router) => {
    app.get("/books", async (req: Request, res: Response) => {
        res.json(await bookService.getAllBooks());
    });

    app.post("/addBooks", async (req, res) => {
        const { title, author, year, genre } = req.body;
        const book = await bookService.addBook(title, author, year, genre);
        res.json(book);
    });

    app.put("/updatebook", async (req, res) => {
        const { title, year } = req.body;
        const book = await bookService.updateBook(title, year);
        res.json(book);
    });

    app.get("/deletebooks/:id", auth, async (req, res) => {
        const id: string = req.params.id;
        const book = await bookService.deleteBook(id);
        res.json(book);
    });

    // Add route for searching books
    app.get("/books/search", async (req, res) => {
        const { query } = req.query;
        const books = await bookService.searchBooks(query as string);
        res.json(books);
    });
}