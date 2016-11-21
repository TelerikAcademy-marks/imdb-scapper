/* globals console require setTimeout Promise */
"use strict";

const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const queuesFactory = require("../data-structures/queue");
const modelsFactory = require("../models");
const constants = require("../config/constants");
const spanTimer = require("../utils/spanTimer");

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = constants.moviesUrlTemplate({ genreType: genre, page: i + 1 });
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl() {
    if (urlsQueue.isEmpty()) {
        return Promise.resolve();
    }

    const url = urlsQueue.pop();
    console.log(`Working with ${url}`);
    return httpRequester.get(url)
        .then((result) => {
            const selector = ".col-title span[title] a";
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return spanTimer.wait(1000);
        })
        .then(() => {
            getMoviesFromUrl();

            return Promise.resolve();
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

const asyncPagesCount = 8;

module.exports.fillDatabaseWithSimpleMovies = function () {
    //return new Promise((resolve, reject) => {
        return Promise.all(Array.from({ length: asyncPagesCount }).map(() => getMoviesFromUrl()));
            // .then(() => {
            //     resolve();
            // });
    //});
};
