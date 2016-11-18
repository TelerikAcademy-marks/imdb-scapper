/* globals require module, ActorMovie */
"use strict";
/*

For each movie extract name of the movie, the id of the Movie in IMDB, and the name of the character */
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let DetailedActorSchema = new Schema({

    profilImageUrl: {
        type: String,
        required: true
    },
       name: {
        type: String,
        required: true
    },
   biography : {
        type: String,
        required: true
    },
   
    movies:{
        type:[{ActorMovie}],
        required : true
    }
});

let DetailedActor;
DetailedActorSchema.statics.DetailsActorByNameAndUrl =
    function (coverImageUrl, title, description, category, relaseDate, actors, trailerUrl="") {
           return new DetailedActor({ coverImageUrl, trailerUrl, title, description, category, relaseDate, actors });
    };

mongoose.model("DetailedActor", DetailedActorSchema);
DetailedActor = mongoose.model("DetailedActor");
module.exports = DetailedActor;