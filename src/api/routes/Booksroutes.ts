import { Request, Response, Router } from 'express';
import { BookService } from '../../services/Bookservices';

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

    app.delete("/deletebooks", async (req, res) => {
        const { title } = req.body;
        const book = await bookService.deleteBook(title);
        res.json(book);
    });

    // Add route for searching books
    app.get("/books/search", async (req, res) => {
        const { query } = req.query;
        const books = await bookService.searchBooks(query as string);
        res.json(books);
    });
}
