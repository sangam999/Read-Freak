import booksModel from '../model/schema/BooksSchema';
import IBooksPage from '../interfaces/IBooksPage';
import wishListsModel from '../model/schema/WishLists'
import {Homepage} from '../api/response/homepage';
import {WishList, WishlistButton} from "../api/response/WishList";
import {Recommendation} from '../api/response/Recommendation';
import IWishLists from "../interfaces/IWishLists";
import wishLists from "../model/schema/WishLists";
import userSchema from "../model/schema/userSchema";

export class HomepageServices {

    async getHomepage(userId: string, recentlyViewed?: IBooksPage[]) {
        try {
            const recommendation = await this.getRecommendation();
            const banner = 'Greetings';

            const wishLists = await this.getWishLists(userId)

            const response: Homepage = new Homepage(banner, recommendation, wishLists);

            return response;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async getRecommendation(recentlyViewed?: IBooksPage[]): Promise<Recommendation[]> {
        try {
            const recommendedBooks: Recommendation[] = [];
            const similarBooks: IBooksPage[] = await booksModel.find({}).limit(5);

            for (const book of similarBooks) {
                recommendedBooks.push(new Recommendation(book));
            }
            return recommendedBooks;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async getWishLists(userId: string): Promise<WishList[]> {
        try {
            const list: WishList[] = [];
            const wishLists: IWishLists[] = await wishListsModel.find({ userId: userId });

            // Assuming wishlistButton is a new Button instance with type "add" and link "/wishlist/add"
            const wishlistButton = new WishlistButton("add", "/wishlist/add");

            for (const wishlistItem of wishLists) {
                list.push(new WishList(
                    wishlistItem.bookId,
                    wishlistItem.userId,
                    wishlistItem.title,
                    wishlistItem.author,
                    wishlistItem.genre,
                    wishlistButton
                ));
            }

            return list;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

}
