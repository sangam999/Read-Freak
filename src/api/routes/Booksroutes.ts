import {Request, Response, Router} from 'express'
import bodyParser from "body-parser";
import {BookService} from "../../services/Bookservices";

const bookService = new BookService();

// app.use(bodyParser.json());

export default (app: Router) => {
    app.get("/books", async (req: Request, res: Response) => {
        res.json(await bookService.getAllBooks());
    });

    app.get("/books/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const book = bookService.getBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
    });

    app.post("/books", async (req, res) => {
        const { title, author, year } = req.body;
        const book = bookService.addBook(title, author, year);
        res.json(book);
    });

    app.put("/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const { title, author, year } = req.body;
        const updatedBook = bookService.updateBook(id, title, author, year);
        if (updatedBook) {
            res.json(updatedBook);
        } else {
            res.status(404).send("Book not found");
        }
    });

    app.delete("/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const success = bookService.deleteBook(id);
        if (success) {
            res.send("Book deleted successfully");
        } else {
            res.status(404).send("Book not found");
        }
    });
}