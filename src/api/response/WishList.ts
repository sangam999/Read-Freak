export class WishlistButton {
    type: string;
    link: string;

    constructor(type: string, link: string) {
        this.type = type;
        this.link = link;
    }
}

export class WishList {
    bookid: string;
    user_Id: string;
    title: string;
    author: string;
    genre: string;
    wishlistButton: WishlistButton; // Adding wishlistButton property

    constructor(
        bookid: string,
        user_Id: string,
        title: string,
        author: string,
        genre: string,
        wishlistButton: WishlistButton // Accepting wishlistButton parameter
    ) {
        this.bookid = bookid;
        this.user_Id = user_Id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.wishlistButton = wishlistButton; // Assigning wishlistButton
    }
}
