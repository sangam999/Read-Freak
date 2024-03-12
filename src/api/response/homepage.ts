

export class Homepage {
    banner: string;
    recommendation:string;
    wishLists:string;
    constructor(
        banner: string,
        recommendation: string,
        wishLists:string,
    ) {
        this.banner = banner;
        this.recommendation = recommendation;
        this.wishLists = wishLists;

    }
}