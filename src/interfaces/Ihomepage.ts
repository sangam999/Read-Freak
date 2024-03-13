import {Recommendation} from "../api/response/Recommendation";
import {wishLists} from "../api/response/wishLists";

export default interface IHomePage {
    banner: string;
    recommendations: Recommendation[];
    whistLists: wishLists[];


}