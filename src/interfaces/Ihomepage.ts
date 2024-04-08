import {Recommendation} from "../api/response/Recommendation";
import {WishList} from "../api/response/WishList";

export default interface IHomePage {
    banner: string;
    recommendations: Recommendation[];



}