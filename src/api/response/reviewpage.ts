export class reviewpage {
    review_id?: string;
    book_id?: string;
    user_id?: string;
    rating: string;
    review_text:string;
    review_by:string;
    review_date: string;
    constructor(
        rating: string,
        review_text: string,
        review_by: string,
        review_date: string,
        review_id?:string,
        book_id?:string,
        user_id?:string,

    )    {

        this.review_id =review_id;
        this.book_id =book_id;
        this.user_id = user_id;
        this.rating =rating;
        this.review_text=review_text;
        this.review_by=review_by;
        this.review_date=review_date;
    }
}