import { Request, Response, Router } from 'express';
import { BookService } from '../../services/Bookservices';
import {auth} from "../middlewear/Auth";
import IBooksPage from "../../interfaces/IBooksPage";
import {BookSection} from "../response/Booksresponse";
import booksModel from "../../model/schema/BooksSchema";
import {IUser} from "../../interfaces/IUser";
import {AuthService} from "../../services/authServices";
import {adminAuthMiddleware} from "../middlewear/adminAuthMiddleware";

const bookService = new BookService();

export default (app: Router) => {
    app.get('/getAllBooks',auth, async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id
            const booksData = await bookService.getallbooks(id,req.user.role);

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


    app.get('/getbook/:id', async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const  bookSection  = await bookService.getBookById(id) ;

            res.status(200).json(bookSection); // Send the bookSection as JSON response
        } catch (error) {
            console.error('Error getting book by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
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

    app.delete("/deletebooks/:id", adminAuthMiddleware, async (req, res) => {
        const id: string = req.params.id;

        try {
            const book = await bookService.deleteBook(id);
            res.send(book.message);
        } catch (e) {
            res.send("Invalid Request")
        }
    });

    app.post('/books/search', async (req, res) => {
        try {
            const {title} = req.body;
            const result = await bookService.searchBooks(title, req.body);
            // @ts-ignore
            if (!result || result.message) {
                return res.status(404).json({message: 'No books found'});
            }
            return res.status(200).json(result);
        } catch (error) {

            // @ts-ignore
            return res.status(500).json({message: error.message});
        }
    });
}