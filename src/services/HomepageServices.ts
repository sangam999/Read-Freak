import booksModel from '../model/schema/BooksSchema';
import IBooksPage from '../interfaces/IBooksPage';
import wishListsModel from '../model/schema/WishLists'
import {Homepage} from '../api/response/homepage';
import {WishList} from "../api/response/WishList";
import {Recommendation} from '../api/response/Recommendation';
import IWishLists from "../interfaces/IWishLists";
import wishLists from "../model/schema/WishLists";
import userSchema from "../model/schema/userSchema";


export class HomepageServices {

    async getHomepage(userId: string, recentlyViewed?: IBooksPage[]) {
        try {
            const Recommendation = await this.Recommendation();
            const banner = 'Greetings';

            const WishLists = await this.getWishLists(userId)

            const response: Homepage = new Homepage(banner, Recommendation, WishLists);

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

    async  getWishLists(userId: string): Promise<WishList[]> {
        try {
            const list: WishList[] = []
            const wishLists: IWishLists[] = await wishListsModel.find({ userId: userId });
            return list;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

}






