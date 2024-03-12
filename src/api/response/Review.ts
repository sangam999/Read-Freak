export class Review {
    bookid: string;
    rating: string;
    reviewText:string;
    reviewBy:string;
    reviewDate: string;
    constructor(
        rating: string,
        reviewText: string,
        reviewBy: string,
        reviewDate: string,
        bookid:string,


    )    {


        this.bookid =bookid;
        this.rating =rating;
        this.reviewText=reviewText;
        this.reviewBy=reviewBy;
        this.reviewDate=reviewDate;
    }
}