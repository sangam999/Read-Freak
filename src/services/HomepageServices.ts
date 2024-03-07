
import IHomePage from "../interfaces/Ihomepage";
import HomePageModel from "../model/schema/HomePage";
import {homepage} from "../api/response/homepage";


export class HomepageService {


    static async getAllHomepageEntries(): Promise<IHomePage[]> {
        return HomePageModel.find().exec();
    }




}
