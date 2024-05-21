import  wishListsModel from "../model/schema/WishLists"; // Corrected import statement

import { WishList, WishListSection } from "../api/response/WishList";
import BooksSchema from "../model/schema/BooksSchema";
import { IWishLists } from "../interfaces/IWishLists";

export class wishlistsServices {
    async getWishListById(userId: string): Promise<WishListSection> {
        try {
            // Find wishlists for the given userId
            const wishListData = await wishListsModel.findOne({userId: userId});

            if (!wishListData) {
                throw new Error("No wishlist found for the user");
            }

            const wishLists: WishList[] = [];
            const isUser = true;
            const baseUrl = 'http://localhost:3000';
            const endpoint = '/removewishlist';

            // Iterate over each wish list item
            for (const wishListItem of wishListData.wishlists) {
                // Fetch book data for the current wishlist item's bookId
                const book = await BooksSchema.findById(wishListItem);

                // If book not found, skip adding to the wishlist
                if (!book) {
                    console.error(`Book not found for bookId: ${wishListItem}`);
                    continue;
                }

                // Create a WishList object using book data
                const wishList: WishList = new WishList(
                    book.title,
                    book.author,
                    book.genre,
                    isUser,
                    baseUrl,
                );

                wishLists.push(wishList);
            }

            // Create a WishListSection object with the wishLists array
            const wishListSection: WishListSection = new WishListSection(wishLists);

            return wishListSection;
        } catch (error) {
            console.error("Error fetching wishlists:", error);
            throw new Error("Failed to fetch wishlists");
        }
    }

    async addWishList(bookId: string, userId: string) {
        try {
            // Find the wishlist entry for the user
            let wishlistEntry = await wishListsModel.countDocuments({userId: userId});

            // If the wishlist entry doesn't exist, create a new one
            if (wishlistEntry ==0) {
               await wishListsModel.create({userId: userId, wishlists: [bookId]});
            } else {
                // Ensure that the bookId is not already in the wishlist

                // Add the new book to the wishlist

                await wishListsModel.updateOne({
                    userId: userId
                },
                    {
                        $push: {
                            wishlists: bookId
                        }
                    })
            }

            // Save the updated or new wishlist entry

            console.log("Wishlist added successfully");
        } catch (error) {
            console.error("Error adding wishlist:", error);
            throw new Error("Failed to add wishlist");
        }
    }

    async removeWishlist(bookId: string, userId: string): Promise<void> {
        try {
            // Find the wishlist entry and remove the bookId from the wishlist array
            await wishListsModel.updateOne({userId: userId}, {$pull: {wishlists: bookId}});
            console.log("Book removed from wishlist successfully");
        } catch (error) {
            // Handle potential errors
            console.error('Error removing book from wishlist:', error);
            throw new Error('Could not remove book from wishlist');
        }
    }
}
