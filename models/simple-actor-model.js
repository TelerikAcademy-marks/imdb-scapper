/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let SimpleActorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    actorListNumber: {
        type: String,
        required: true
    }
});

//  /name/{someId}//?ref_=tt_cl_t{listNumer}
function extractImdbIdFromUrl(url) {
    let index = url.indexOf("/?ref");
    let listNumberIndex = url.indexOf("tt_cl_t");

    return {
        id: url.substring("/name/".length, index),
        listNumber: url.substring(listNumberIndex + "tt_cl_t".length)
    };
}

let SimpleActor;
SimpleActorSchema.statics.getSimpleActorByNameAndUrl =
    function (actorName, url) {
        let imdbInfo = extractImdbIdFromUrl(url);
        let actorId = imdbInfo.id;
        let listNumber = imdbInfo.listNumber;

        return new SimpleActor({
            name: actorName,
            imdbId: actorId,
            actorListNumber: listNumber
        });
    };

mongoose.model("SimpleActor", SimpleActorSchema);
SimpleActor = mongoose.model("SimpleActor");
module.exports = SimpleActor;