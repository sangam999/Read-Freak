import {Recommendation} from "./Recommendation";



export class Homepage {
    banner: string;
    Recommendation:Recommendation[];

    constructor(
        banner: string,
        Recommendation:Recommendation[],

    ) {
        this.banner = banner;
        this.Recommendation = Recommendation;


    }
}