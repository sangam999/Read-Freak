import wishListsModel from "../model/schema/WishLists";
import {AddWishlist, WishList, WishListSection} from "../api/response/WishList";
import IWishLists from "../interfaces/IWishLists";
import wishlists from "../api/routes/Wishlists";

export class wishlistsServices {
    async getWishListbyId(userId: string): Promise<WishListSection> {
        try {
            // Find wishlists for the given userId
            const wishListData: IWishLists[] = await wishListsModel.find({userId});

            const wishLists: WishList[] = [];

            // Iterate over each wish list item and create a WishList object
            for (const wishListItem of wishListData) {
                const wishList: WishList = new WishList(
                    wishListItem.bookId,
                    wishListItem.userId,
                    wishListItem.title,
                    wishListItem.author,
                    wishListItem.genre
                );
                wishLists.push(wishList);
            }

            // Create a new AddWishlist object (assuming it's necessary)
            const addWishList: AddWishlist = new AddWishlist('Add WishList', 'http://localhost:3000/addwishlist');

            // Create a WishListSection object with the wishLists array and addWishList object
            const wishListSection: WishListSection = new WishListSection(wishLists, addWishList);

            return wishListSection;
        } catch (error) {
            console.error("Error fetching wishlists:", error);
            throw new Error("Failed to fetch wishlists");
        }
    }

    async addWishList(userId: string, bookId: string, title: string, author: string, genre: string){
        try {

            const newWishListData: IWishLists = {
                userId: userId,
                bookId: bookId,
                title: title,
                author: author,
                genre: genre
            };


            await wishListsModel.create(newWishListData);

            console.log("Wishlist added successfully");
        } catch (error) {
            console.error("Error adding wishlist:", error);
            throw new Error("Failed to add wishlist");
        }
    }




}


