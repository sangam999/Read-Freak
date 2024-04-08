import IBooksPage from "../../interfaces/IBooksPage";

const baseUrl = "http://localhost:3000/";
const endpoint = "deletebooks";

export class Book {
    _id: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    delete: string;


    constructor(book: IBooksPage, button?: Button) {
        this._id = book._id;
        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year);
        this.genre = book.genre;
        this.delete = baseUrl + endpoint + book._id;

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
