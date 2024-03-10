export class recommendation {
    title: string;
    author:string;
    genre:string;
    reviews: string;



    constructor(
        title: string,
        author: string,
        genre:string,
        reviews:string,
    )

    {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.reviews = reviews;

    }

    static async getRecommendations() {

    }
}