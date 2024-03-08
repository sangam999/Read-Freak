

export class Homepage {
    banner: string;
    recommendation:string;
    wishLists:string;
    recentActivities: string;



    constructor(
        banner: string,
        recommendation: string,
        wishLists:string,
        recentActivities:string,
    ) {
        this.banner = banner;
        this.recommendation = recommendation;
        this.wishLists = wishLists;
        this.recentActivities = recentActivities;

    }
}