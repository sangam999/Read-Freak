import {Recommendation} from "./Recommendation";
import {WishList} from "./WishList";


export class Homepage {
    banner: string;
    Recommendation:Recommendation[];
    wishLists:WishList[];
    constructor(
        banner: string,
        Recommendation:Recommendation[],
        wishLists:WishList[],
    ) {
        this.banner = banner;
        this.Recommendation = Recommendation;
        this.wishLists = wishLists;

    }
}