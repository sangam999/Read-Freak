import IBooksPage from "../../interfaces/IBooksPage";

const baseUrl = "https://via.placeholder.com";
const bookCoverURL = "https://via.placeholder.com/300"; // Example placeholder URL
const endpoint = "300";

export class Book {
    bookId: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    delete: string;
    button?: Button; // Add button property

    constructor(book: IBooksPage, button?: Button) {
        this.bookId = book.bookId;
        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
        this.delete = baseUrl + endpoint + "/" + book.bookId; // Constructing delete URL for a book
        this.button = button; // Assign button if provided
    }
}

export class Button {
    type: string;
    link: string;

    constructor(type: string, link: string) {
        this.type = type;
        this.link = link;
    }
}

export class BookSection {
    books: Book[];
    bookCover: string;
    summary: string;
    button?: Button; // Add button property

    constructor(
        books: Book[],
        bookCover: string,
        summary: string,
        button?: Button // Accept button parameter
    ) {
        this.books = books;
        this.bookCover = this.constructBookCoverURL(bookCover);
        this.summary = summary;
        this.button = button; // Assign button if provided
    }

    private constructBookCoverURL(bookCover: string): string {
        const bookCoverURL = "https://via.placeholder.com/300"; // Example placeholder URL
        return bookCoverURL;
    }
}
