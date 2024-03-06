import {Request, Response, Router} from 'express'
import bodyParser from "body-parser";
import {BookService} from "../../services/Bookservices";

const bookService = new BookService();

// app.use(bodyParser.json());

export default (app: Router) => {
    app.get("/books", async (req: Request, res: Response) => {
        res.json(await bookService.getAllBooks());
    });

    // app.get("/books/:id", async (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const book = bookService.getBookById(id);
    //     if (book) {
    //         res.json(book);
    //     } else {
    //         res.status(404).send("Book not found");
    //     }
    // });

    app.post("/addBooks", async (req, res) => {
        const { title, author, year } = req.body;
        const book = bookService.addBook(title, author, year);
        res.json(book);
    });

    app.put("/updatebook", (req, res) => {
        const { title, year } = req.body;
        const book = bookService.updateBook(title, year);
    });

    app.delete("/deletebooks", (req, res) => {
        const { title } = req.body;
        const book = bookService.deleteBook(title);
        res.json(book);
    });
}