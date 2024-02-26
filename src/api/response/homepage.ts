export class homepage{
    constructor(
        public layoutType: string,
        public layoutContent: LayoutContent
    ) {
    }
}

export class LayoutContent {
    banner?:Text;
    title?: Text;
    img?:string;
    summary?: Array<string> = [];
    author?:string;
    ratings?: string;
    reviews?: string;
    recommendations?: string;



    constructor(
        banner?:Text,
        title?: Text,
        img?: string,
        summary?: Array<string>,
        author?:string,
        ratings?:string,
        reviews?:string,
        recommendations?: string,

    ) {
        this.banner =banner;
        this.title = title;
        this.img = img;
        this.summary = summary;
        this.author = author;
        this.ratings = ratings;
        this.reviews = reviews;
        this.recommendations = recommendations;

    }
}