
import { Request, Response } from 'express';
import HomePageModel from "../model/schema/HomePage";
import IHomePage from "../interfaces/Ihomepage";
import booksModel from "../model/schema/BooksSchema";
import IBooksPage from "../interfaces/IBooksPage";
import wishListsModel from "../model/schema/wishLists";
import bannerModel from "../model/schema/banner";
import recentActivitiesModel from "../model/schema/recentActivities";

export class HomepageServices {

    async getHomepage(banner: string, recommendation: string, wishLists: string, recentActivities: string): Promise<IHomePage[]> {
        try {
            return await HomePageModel.find({ banner, recommendation, wishLists, recentActivities });
        } catch (err) {
            throw new Error((err as Error).message);
        }
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

    async wishLists(userId: string): Promise<any[]> {
        try {
            const userWishLists = await wishListsModel.find({ userId });
            return userWishLists;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async banner(): Promise<any[]> {
        try {
            const banners = await bannerModel.find();
            return banners;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async recentActivities(userId: string): Promise<any[]> {
        try {
            const recentActivities = await recentActivitiesModel.find({ userId });
            return recentActivities;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }


}
export default HomepageServices;