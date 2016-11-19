/* globals require module, ActorSchema */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let MovieDetailsSchema = new Schema({

    coverImageUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
     
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
         type: String,
        required: true        
    },
    relaseDate:{
        type: Date,
        require: true
    },
    actors:{
        type:[{ActorSchema}],
        required: true
    }
});

let MovieDetails;
MovieDetailsSchema.statics.DetailsMovieByTitle =
    function (coverImageUrl, title, description, category, relaseDate, actors, trailerUrl="") {
           return new MovieDetails({ coverImageUrl, trailerUrl, title, description, category, relaseDate, actors });
    };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;