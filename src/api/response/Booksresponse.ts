import IBooksPage from "../../interfaces/IBooksPage";

const baseUrl = "http://localhost:3000/";
const endpoint = "deletebooks";

export class Book {
    bookId: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    delete: string;


    constructor(book: IBooksPage, button?: Button) {
        this.bookId = book.bookId;
        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
        this.delete = baseUrl + endpoint + book.bookId;

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

export class AddBook{
    text: string;
    link:string;
    button?:Button

    constructor(
        text: string,
        link:string,
        button?: Button
    ) {
        this.text = text;
        this.link = link;
        this.button = button;
    }
}

export class BookSection {
    books: Book[];
    button?: AddBook | undefined; // Add button property

    constructor(
        books: Book[],
        button?: AddBook // Accept button parameter
    ) {
        this.books = books;
        this.button = button; // Assign button if provided
    }

}
