import { Request, Response } from "express";

import prisma from "prisma";

export class Book {
    // Get all books
    async index(req: Request, res: Response) {
        const books = await prisma.book.findMany();
        return res.json(books);
    }

    // Get specific book
    async searchBook(req: Request, res: Response) {
        let name: string = req.params.name.toUpperCase();

        if (name.includes("_")) {
            name = name.replace("_", " ");
        }

        const book = await prisma.book.findFirst({
            where: {
                name: name,
            },
        });

        if (!book) {
            return res.status(404).json({message: "Error: Book not found."});
        } else {
            return res.status(200).render("index", {
                title: book.title,
                summary: book.summary,
                genre: book.genre,
                author: book.author,
                review: book.review,
            });
        }
    }

    //Create new Book
    async create(req: Request, res: Response) {
        let {title, summary, genre, author, review} = req.body;


        const newBook = await prisma.book.create({
            data: {
                title,
                summary,
                genre,
                author,
                review,

            },
        });

        return res.status(200).json(newBook);
    }

    //Update book
    private summary: boolean;
    private genre: boolean;
    private title: boolean;
    async updateBook(req: Request, res: Response) {
        const {id, name, author, pages} = req.body;

        const book = await prisma.book.findUnique({
            where: {id: id},
        });

        if (!book) {
            return res.status(200).json({error: "Could not find book by given ID"});
        }

        if (this.title) {
            const updatetitle = await prisma.book.update({
                where: {id: id},
                data: {title: this.title},
            });
        }

        if (this.summary) {
            const updatesummary = await prisma.book.update({
                where: {id: id},
                data: {author: author},
            });
        }

        if (this.genre) {
            const updategenre = await prisma.book.update({
                where: {id: id},
                data: {pages: pages},
            });
        }

        return res.status(204).json(book);
    }

    static async create(newBook: Omit<any, "authorName">) {

    }
}
    
