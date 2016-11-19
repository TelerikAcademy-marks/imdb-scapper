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
    category: {
        type: String,
        required: true
    },
    actors: []
});

let MovieDetails;
MovieDetailsSchema.statics.detailsMovieByTitle =
    function(coverImageUrl, title, description, category, trailerUrl = "", actors) {
        return new MovieDetails({ coverImageUrl, trailerUrl, title, description, category, actors });
    };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;