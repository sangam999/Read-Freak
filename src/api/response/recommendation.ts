export class recommendation {
    title: string;
    author:string;
    genre:string;
    recentActivities: string;



    constructor(
        title: string,
        author: string,
        genre:string,
        recentActivities:string,
    )

    {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.recentActivities = recentActivities;

    }


}