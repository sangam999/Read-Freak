
import HomePageModel from "../model/schema/HomePage";
import {Homepage} from "../api/response/homepage";
import homePage from "../model/schema/HomePage";


export class HomepageService {

    async getAllHomepageEntries(): Promise<Homepage> {

        const response: Homepage = new Homepage();

        return response;
    }



}
