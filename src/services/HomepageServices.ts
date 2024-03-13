import  booksModel from '../model/schema/BooksSchema';
import IBooksPage from '../interfaces/IBooksPage';
import wishListsModel from '../model/schema/wishLists'
import { Homepage } from '../api/response/homepage';
import {wishLists} from "../api/response/wishLists";
import { Recommendation } from '../api/response/Recommendation';

export class HomepageServices {

    async getHomepage(recentlyViewed?: IBooksPage[]) {
        try {
            const Recommendation = await this.Recommendation();
            const banner = 'Greetings';

            const wishLists = await this.getwishLists();

            const response: Homepage = new Homepage(banner, Recommendation, wishLists);

            return response;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async Recommendation(recentlyViewed?: IBooksPage[]): Promise<Recommendation[]> {
        try {
            // if (!recentlyViewed.length) {
            //     throw new Error("Recently Viewed was empty");
            // }

            const recommendedBooks: Recommendation[] = [];

            // const randomizedBook:IBooksPage = recentlyViewed[(Math.floor(Math.random() * recentlyViewed.length))];
            const similarBooks: IBooksPage[] = await booksModel.find({}).limit(5);
            // const filteredBooks: IBooksPage[] = similarBooks.filter(similarBook => String(similarBook._id) !== String(randomizedBook._id));

            for (const book of similarBooks) {
                recommendedBooks.push(new Recommendation(book));
            }
            return recommendedBooks;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async getwishLists(): Promise<wishLists[]> {
        try {
            const wishLists = await this.getwishLists();
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



