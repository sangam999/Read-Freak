
import {Book} from "../api/response/Booksresponse";
import booksModel from "../model/schema/BooksSchema";
import IBooksPage from "../interfaces/IBooklsPage";

export class BookService {
    private books: Book[] = [];
    private nextId: number = 1;

    async getBook(id: string): Promise<IBooksPage[]> {
        return booksModel.find({id: id})
    }

    addBook(title: string, author: string, year: number): Book {
        const book = new Book(this.nextId++, title, author, year);
        this.books.push(book);
        return book;
    }

    getAllBooks(): Book[] {
        return this.books;
    }

    getBookById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    updateBook(id: number, title: string, author: string, year: number): Book | undefined {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], title, author, year };
            return this.books[index];
        }
        return undefined;
    }

    deleteBook(id: number): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }
}
