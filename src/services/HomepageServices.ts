import { HomepageModel } from "./Homepage";
import Homepage from "./Homepage";

export class HomepageService {
    static async createHomepage(data: HomepageModel): Promise<HomepageModel> {
        const homepage = new Homepage(data);
        return homepage.save();
    }

    static async getAllHomepageEntries(): Promise<HomepageModel[]> {
        return Homepage.find().exec();
    }

    static async getHomepageEntryById(id: string): Promise<HomepageModel | null> {
        return Homepage.findById(id).exec();
    }

    static async updateHomepageEntry(id: string, data: Partial<HomepageModel>): Promise<HomepageModel | null> {
        return Homepage.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    static async deleteHomepageEntry(id: string): Promise<void> {
        await Homepage.findByIdAndDelete(id).exec();
    }
}
