const { Schema, model } = require("mongoose");

const booksSchema = new Schema(
    {
        book_id : {
            type: String,
            required: true,
        },
        tittle :{
            type: String,
            requried: true
        },
        summary : {
            type : String,
            required : true
        },

        genre: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        }
    },)
