/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ActorDetailsSchema = new Schema({

    coverImageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    movies: []
});

let ActorDetails;
ActorDetailsSchema.statics.detailsActorByName =
    function(name, coverImageUrl, biography, movies) {
        return new ActorDetails({ name, coverImageUrl, biography, movies });
    };

mongoose.model("ActorDetails", ActorDetailsSchema);
ActorDetails = mongoose.model("ActorDetails");
module.exports = ActorDetails;