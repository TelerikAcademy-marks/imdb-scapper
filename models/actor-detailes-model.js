/* globals require module, ActorMovie */
"use strict";

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
    function (profilImageUrl, name, biography, movies) {
           return new DetailedActor({ profilImageUrl, name, biography, movies});
    };

mongoose.model("DetailedActor", DetailedActorSchema);
DetailedActor = mongoose.model("DetailedActor");
module.exports = DetailedActor;