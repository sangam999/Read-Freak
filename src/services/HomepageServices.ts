
import IHomePage from "../interfaces/Ihomepage";
import HomePageModel from "../model/schema/HomePage";
import {homepage} from "../api/response/homepage";


export class HomepageService {
    static async createHomepage(data: homepage): Promise<IHomePage> {
        const homepage = new HomePageModel(data);
        return homepage.save();
    }

    static async getAllHomepageEntries(): Promise<IHomePage[]> {
        return HomePageModel.find().exec();
    }

    static async getHomepageEntryById(id: string): Promise<IHomePage | null> {
        return HomePageModel.findById(id).exec();
    }

    static async updateHomepageEntry(id: string, data: Partial<homepage>): Promise<IHomePage | null> {
        return HomePageModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    static async deleteHomepageEntry(id: string): Promise<void> {
        await HomePageModel.findByIdAndDelete(id).exec();
    }
}
