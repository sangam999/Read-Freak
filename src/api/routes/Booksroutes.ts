import  express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {BookService} from "../../services/Bookservices";

const app = express();
const port = 3000;
const bookService = new BookService();

app.use(bodyParser.json());

app.get("/books", (res: Response, req: Request) => {
    res.json(bookService.getAllBooks());
});

app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = bookService.getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.post("/books", (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});