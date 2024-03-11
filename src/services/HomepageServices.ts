import { Request, Response } from 'express';
import  {recommendation} from '../api/response/recommendation';
import {wishLists} from '../api/response/wishLists';
import {recentActivities} from '../api/response/recentActivities';
import {banner} from '../api/response/banner';
import homePage from "../model/schema/HomePage";
import {Homepage} from "../api/response/homepage";
import HomePageModel from "../model/schema/HomePage";
import IHomePage from "../interfaces/Ihomepage";
import booksModel from "../model/schema/BooksSchema";
import IBooksPage from "../interfaces/IBooksPage";


export class HomepageServices {

    async getHomepage(banner:string,recommendation:string,wishLists:string,recentActivities:string): Promise<IHomePage[]> {
        return HomePageModel.find({banner:banner,recommendation:recommendation,wishLists:wishLists,recentActivities:recentActivities})
    }

    async recommendation(recentlyViewed: IBooksPage[]) {
        const booksgenre:string[] = [];
        for(let book of recentlyViewed)
        {
            booksgenre.push(book.genre)
            // const recentSelectedBooks = booksModel.find(books,{books})

         }


        }


    async wishLists(bookId:string,username: string,title:string,author:string,genre:string) {
        try {
            const wishLists = await HomePageModel.updateOne ({bookId},{$set: {username}});
            if (wishLists.modifiedCount) {
                return wishLists;
            }
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }


    async banner(): Promise<IHomePage[]> {
        return HomePageModel.find();
    }
}