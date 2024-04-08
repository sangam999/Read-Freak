import {Recommendation} from "./Recommendation";
import {WishList} from "./WishList";


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