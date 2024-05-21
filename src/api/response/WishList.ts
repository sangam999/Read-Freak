const baseUrl = "http://localhost:3000/";
const endpoint = "remove";

export class WishList {
    title: string;
    author: string;
    genre: string;
    remove?: string ;

    constructor(
        title: string,
        author: string,
        genre: string,
        isUser: boolean,
        bookId:string

    ) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        if (isUser) {
            this.remove = `${baseUrl}${endpoint}/${bookId}`;
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

export class WishListSection {
    wishList: WishList[];

    constructor(
        wishList: WishList[],
    ) {
        this.wishList = wishList;
    }
}

