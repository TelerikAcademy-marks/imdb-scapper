/* globals console require setTimeout Promise */
"use strict";

const constants = require("./config/constants");
const simpleMovies = require("./logic/simpleMovieScrapper");
const detailMovies = require("./logic/detailsMovieScrapper");
const detailActors = require("./logic/detailsActorScrapper");

const db = require("./config/mongoose");
db.open(constants.connectionString);

// Insert simple movies than stop app then start second command then again stop and start the third.
// Is't working other way for now.
// inserts 40 to 60 records than timeout
//simpleMovies.fillDatabaseWithSimpleMovies();
Promise.resolve()
    .then(() => {
        return simpleMovies.fillDatabaseWithSimpleMovies()
    })
    .then(() => {
        return detailMovies.fillDatabaseWithDetailsMovies();
    })
    .then(() => {
        return detailActors.fillDatabaseWithDetailsActors();
    })
    .then(() => {
        console.log("DB closed.");
        //db.close();
    });

// inserts 40 to 60 records than timeout
// detailMovies.fillDatabaseWithDetailsMovies();

// inserts 40 to 60 records than timeout
// detailActors.fillDatabaseWithDetailsActors();
