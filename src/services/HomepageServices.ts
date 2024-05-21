import booksModel from '../model/schema/BooksSchema';
import IBooksPage from '../interfaces/IBooksPage';
import {Homepage} from '../api/response/homepage';
import {Recommendation} from '../api/response/Recommendation';

export class HomepageServices {

    async getHomepage(userId: string, recentlyViewed?: IBooksPage[]) {
        try {
            const recommendation = await this.getRecommendation();
            const banner = 'hello Doe';

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



}
