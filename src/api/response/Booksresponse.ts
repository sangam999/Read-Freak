import IBooksPage from "../../interfaces/IBooksPage";

const baseUrl = "http://localhost:3000/";
const deleteEndpoint = "deletebooks";
const wishlistEndpoint = "addwishlist";

export class Book {
    _id: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    delete?: string;
    addWishlist?: string;

    constructor(book: IBooksPage, isAdmin: boolean, isUser: boolean) {
        this._id = book._id;
        this.title = book.title;
        this.author = book.author;
        this.year = parseInt(book.year, 10);
        this.genre = book.genre;
        if (isAdmin) {
            this.delete = `${baseUrl}${deleteEndpoint}/${book._id}`;
        }
        if (isUser) {
            this.addWishlist = `${baseUrl}${wishlistEndpoint}/${book._id}`;
        }
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

export class AddBook {
    text: string;
    link: string;
    button?: Button;

    constructor(text: string, link: string, button?: Button) {
        this.text = text;
        this.link = link;
        this.button = button;
    }
}

export class BookSection {
    books: Book[];
    button?: AddBook;

    constructor(books: Book[], button?: AddBook) {
        this.books = books;
        this.button = button;
    }
}