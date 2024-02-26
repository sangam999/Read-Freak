const { Schema, model } = require("mongoose");

const homepageSchema = new Schema(
    {
        banner : {
            type: Text,
            required: true,
        },
        tittle :{
            type: String,
            requried: true
        },
        Img : {
            type : String,
            required : true
        },

        summary: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        ratings: {
            type: String,
            required: true,
        },
        reviews: {
            type: Number,
            required: true,
        },
        recommendations: {
            type : String,
            required : true,
        }
    },)
