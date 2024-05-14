const baseUrl = "http://localhost:3000/";
const endpoint = "delete";

export class WishList {
    bookId: string;
    userId: string;
    title: string;
    author: string;
    genre: string;
    delete: string;


    constructor(
        bookId: string,
        userId: string,
        title: string,
        author: string,
        genre: string,

    ) {
        this.bookId = bookId;
        this.userId = userId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.delete = baseUrl + endpoint + bookId;

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
export class AddWishlist{
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
export class WishListSection {
    WishList: WishList[];
    button?: AddWishlist | undefined;

    constructor(
        WishList: WishList[],
        button?: AddWishlist
    ) {
        this.WishList = WishList;
        this.button = button;
    }

}
