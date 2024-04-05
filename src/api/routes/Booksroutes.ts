import { Request, Response, Router } from 'express';
import { BookService } from '../../services/Bookservices';
import {auth} from "../middlewear/Auth";
import {adminAuthMiddleware} from "../middlewear/adminAuthMiddleware";
import IBooksPage from "../../interfaces/IBooksPage";
import {BookSection} from "../response/Booksresponse";
import booksModel from "../../model/schema/BooksSchema";

const bookService = new BookService();

export default (app: Router) => {
    app.get('/getAllBooks', async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id; // Change to req.query.id if it's a query parameter
            const booksData = await bookService.getallbooks(id);

            if (!booksData) {
                res.status(404).json({message: 'Books not found'});
                return;
            }

            res.json(booksData);
        } catch (error) {
            console.error("Error fetching books:", error);
            // @ts-ignore
            res.status(500).json({message: error.message});
        }
    });

    app.post("/addbooks", adminAuthMiddleware, async (req, res) => {
        const {title, author, year, genre} = req.body;
        const book = await bookService.addBook(title, author, year, genre);
        res.json(book);
    });

    app.post("/updatebooks/:id", adminAuthMiddleware, async (req, res) => {
        const id = req.params.id;
        const book = await bookService.updateBook(id, req.body);
        res.json(book);
    });

    app.get("/deletebooks/:id", adminAuthMiddleware, async (req, res) => {
        const id: string = req.params.id;

        try {
            const book = await bookService.deleteBook(id);
            res.send(book.message);
        } catch (e) {
            res.send("Invalid Request")
        }
    });

    // Add route for searching books
    app.post('/books/search', async (req, res) => {
        try {
            // Extract the title from the request body
            const {title} = req.body;

            // Call the searchBooks function from your service with the title and the request body
            const result = await bookService.searchBooks(title, req.body);


            // @ts-ignore
            if (!result || result.message) {
                return res.status(404).json({message: 'No books found'});
            }

            // If books are found, return them
            return res.status(200).json(result);
        } catch (error) {
            // Handle any errors that occur during the search
            // @ts-ignore
            return res.status(500).json({message: error.message});
        }
    });
}