import booksModel from '../model/schema/BooksSchema';
import IBooksPage from '../interfaces/IBooksPage';
import wishListsModel from '../model/schema/WishLists'
import {Homepage} from '../api/response/homepage';
import {AddWishlist, WishList, WishListSection} from "../api/response/WishList";
import {Recommendation} from '../api/response/Recommendation';
import IWishLists from "../interfaces/IWishLists";
import wishLists from "../model/schema/WishLists";
import userSchema from "../model/schema/userSchema";

export class HomepageServices {

    async getHomepage(userId: string, recentlyViewed?: IBooksPage[]) {
        try {
            const recommendation = await this.getRecommendation();
            const banner = 'Greetings';

            // Removing wishlists from the method
            const response: Homepage = new Homepage(banner, recommendation);

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

    async getWishLists(userId: string): Promise<WishListSection> {
        try {
            const wishListData: IWishLists[] = await wishListsModel.find({ userId: userId });
            const addWishList: AddWishlist = new AddWishlist('Add WishList', 'http://localhost:3000/addwishlist');

            const wishLists: WishList[] = [];

            for (const wishListItem of wishListData) {
                const wishList: WishList = new WishList(
                    wishListItem.bookId,
                    wishListItem.userId,
                    wishListItem.title,
                    wishListItem.author,
                    wishListItem.genre,

                );
                wishLists.push(wishList);
            }

            const wishListSection: WishListSection = new WishListSection(wishLists,addWishList);

            return wishListSection;
        } catch (error) {
            console.error("Error fetching wishlists:", error);
            throw new Error("Failed to fetch wishlists");
        }
    }


}
