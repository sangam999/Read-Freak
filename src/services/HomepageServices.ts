import { Request, Response } from 'express';
import HomePageModel from "../model/schema/HomePage";
import IHomePage from "../interfaces/Ihomepage";
import booksModel from "../model/schema/BooksSchema";
import IBooksPage from "../interfaces/IBooksPage";
import wishListsModel from "../model/schema/wishLists";
import bannerModel from "../model/schema/banner";
import recentActivitiesModel from "../model/schema/recentActivities";
import { Homepage } from "../api/response/homepage";
import IwishLists from "../interfaces/IwishLists";
import WishLists from "../model/schema/wishLists";
import { wishLists as wishListsResponse } from "../api/response/wishLists";

export class HomepageServices {

    async getHomepage(recentlyViewed: IBooksPage[]) {
        const recommendation = await this.recommendation(recentlyViewed);
        const banner = `Greetings`;

        const wishLists = await this.wishLists();

        const response: Homepage = new Homepage(banner, recommendation, wishLists);

        return response;
    }

    async recommendation(recentlyViewed: IBooksPage[]): Promise<IBooksPage[]> {
        try {
            const recommendedBooks: IBooksPage[] = [];
            for (let book of recentlyViewed) {
                const similarBooks = await booksModel.find({ genre: book.genre });
                const filteredBooks = similarBooks.filter(similarBook => similarBook._id.toString() !== book._id.toString());
                recommendedBooks.push(...filteredBooks.slice(0, 3));
            }
            return recommendedBooks;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async wishLists(): Promise<wishListsResponse[]> {
        try {
            const wishLists = await wishListsModel.find();
            return wishLists;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }
}

// async recentActivities(userId: string): Promise<any[]> {
    //     try {
    //         const recentActivities = await recentActivitiesModel.find({ userId });
    //         return recentActivities;
    //     } catch (err) {
    //         throw new Error((err as Error).message);
    //     }
    // }


}
