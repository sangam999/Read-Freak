import {Recommendation} from "./Recommendation";
import {wishLists} from "./wishLists";


export class Homepage {
    banner: string;
    Recommendation:Recommendation[];
    wishLists:wishLists[];
    constructor(
        banner: string,
        Recommendation:Recommendation[],
        wishLists:wishLists[],
    ) {
        this.banner = banner;
        this.Recommendation = Recommendation;
        this.wishLists = wishLists;

    }
}