export class homepage{
    constructor(
        public layoutType: string,
        public layoutContent: LayoutContent
    ) {
    }
}

export class LayoutContent {
    banner: string;
    recommendations:string;
    wishLists:string;
    recentreviews: string;
    recentActivities: string;



    constructor(
        banner: string,
        recommendations: string,
        wishLists:string,
        recentReveiws:string,
        recentActivities:string,


    ) {
        this.banner = banner;
        this.recommendations = recommendations;
        this.wishLists = wishLists;
        this.recentreviews = recentReveiws;
        this.recentActivities = recentActivities;

    }
}