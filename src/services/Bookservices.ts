import IBooksPage from "../../src/interfaces/IBooksPage";
import booksModel from "../model/schema/BooksSchema";
import { AddBook, Book, BookSection } from "../api/response/Booksresponse";



export class BookService {

    async getallbooks(id: string, role?: string): Promise<BookSection> {
        try {
            const bookData: IBooksPage[] = await booksModel.find({ bookId: id });
            const isAdmin = role === "admin"; // Determine if the user is an admin based on the role parameter
            const isUser = true; // Assuming the user is always authenticated for this example
            const addBook: AddBook = new AddBook('Add Book', 'http://localhost:3000/addbooks');

            const books: Book[] = [];

            for (const bookInfo of bookData) {
                const book: Book = new Book(bookInfo, isAdmin, isUser);
                books.push(book);
            }

            const bookSection: BookSection = new BookSection(books, addBook);

            return bookSection;
        } catch (error) {
            console.error("Error fetching books:", error);
            throw new Error("Failed to fetch books");
        }
    }


    async getBookById(id: string): Promise<Book> {
        try {
            const bookData: IBooksPage | null = await booksModel.findOne({ _id: id });

            if (!bookData) {
                throw new Error("Book not found");
            }

            const isAdmin = true;  // Assuming you have logic to determine if the user is an admin
            const isUser = true;   // Assuming the user is authenticated

            const book: Book = new Book(bookData, isAdmin, isUser);
            return book;
        } catch (error) {
            console.error("Error fetching book:", error);
            throw new Error("Failed to fetch book");
        }
    }





    async addBook(title: string, author: string, year: string, genre: string) {
        const id =`book_${title.toLowerCase().split(" ").join("_")}`;
        const book: { year: string; author: string; genre: string; _id: string; title: string } = {
            _id: id,
            title: title,
            author: author,
            year: year,
            genre: genre
        };

        try {
            const update = await booksModel.insertMany([book]);
            return update;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async updateBook(id: string, body: Record<string, any>) {
        if (!body) {
            return {
                message: "No data found for updating"
            }
        }
        try {
            await booksModel.findByIdAndUpdate(id, { $set: body });
            return {
                message: "Book updated successfully"
            }
        } catch (err) {
            return {
                message: "Book not updated"
            }
        }
    }

    async deleteBook(id: string) {
        try {
            await booksModel.findByIdAndDelete(id);
            return {
                message: "Book deleted successfully"
            };
        } catch (error) {
            return {
                message: "Book not found"
            };
        }
    }

    async searchBooks(title: string, body: Request): Promise<IBooksPage[] | { message: string } | null> {
        try {
            const regex = new RegExp(title, 'i');
            const result = await booksModel.find({ title: { $regex: regex } });

            return result;
        } catch (error) {
            throw new Error(`An error occurred while searching for books: ${(error as Error).message}`);
        }
    }


}
