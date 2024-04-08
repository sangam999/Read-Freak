const baseUrl = "http://localhost:3000/";
const endpoint = "getAllBooks";

export class WishList {
    bookid: string;
    user_Id: string;
    title: string;
    author: string;
    genre: string;


    constructor(
        bookid: string,
        user_Id: string,
        title: string,
        author: string,
        genre: string,

    ) {
        this.bookid = bookid;
        this.user_Id = user_Id;
        this.title = title;
        this.author = author;
        this.genre = genre;

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
