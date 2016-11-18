/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let SimpleActorSchema = new Schema({
    role: {
        type: String,
        required: true
    },
      name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
      profileImageUrl: {
        type: String,
        required: true
      }
});

//  /name/nm1212722/?ref_=tt_cl_t1%22
function extractImdbIdFromUrl(url) {
    let index = url.indexOf("/?ref");
    return url.substring("/title/".length, index);
}

let SimpleActor;
SimpleActorSchema.statics.getSimpleMovieByNameAndUrl =
    function(role, name, url, profileImageUrl) {
        let imdbId = extractImdbIdFromUrl(url);
        return new SimpleActor({ role,name, imdbId,profileImageUrl });
    };

SimpleActorSchema.virtual.imdbUrl = function() {
    return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
};

mongoose.model("SimpleActor", SimpleActorSchema);
SimpleActor = mongoose.model("SimpleActor");
module.exports = SimpleActor;