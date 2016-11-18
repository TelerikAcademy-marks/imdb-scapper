/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ActorMovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    role:{
         type: String,
        required: true
    }
});

//  /title/tt0067992/?ref_=adv_li_tt
function extractImdbIdFromUrl(url) {
    let index = url.indexOf("/?ref");
    return url.substring("/title/".length, index);
}

let ActorMovie;
ActorMovieSchema.statics.getActorMovieByNameAndUrl =
    function(name, url, role) {
        let imdbId = extractImdbIdFromUrl(url);
        return new ActorMovie({ name, imdbId, role });
    };

ActorMovieSchema.virtual.imdbUrl = function() {
    return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
};

mongoose.model("ActorMovie", ActorMovieSchema);
ActorMovie = mongoose.model("ActorMovie");
module.exports = ActorMovie;