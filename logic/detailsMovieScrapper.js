const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-detailMovieParser");
const queuesFactory = require("../data-structures/queue");
const modelsFactory = require("../models");
const constants = require("../config/constants");
const spanTimer = require("../utils/spanTimer");

let urlsQueue = queuesFactory.getQueue();

function getMoviesFromUrl() {
    if (urlsQueue.isEmpty()) {
        return Promise.resolve();
    }

    const url = urlsQueue.pop();
    console.log(`Working with ${url}`);
    return httpRequester.get(url)
        .then((result) => {
            const html = result.body;
            return htmlParser.parseDetailMovie(html);
        })
        .then(movies => {
            let dbMovies = movies.detailMovies.map(movie => {
                return modelsFactory.getDetailMovie(movie.coverImgUrl, movie.title, movie.description, movie.genres, movie.trailerUrl);
            });

            let simpleActors = movies.actors.map(actor => {
                return modelsFactory.getSimpleActor(actor.url, actor.name);
            });

            dbMovies.forEach((movie) => {
                simpleActors.forEach((actor) => {
                    movie.actors.push(actor);
                });
            });

            modelsFactory.insertManyDetailMovie(dbMovies);

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

module.exports.fillDatabaseWithDetailsMovies = function () {
    //return new Promise((resolve, reject) => {
    return modelsFactory.getAllSimpleMovies()
        .then((result) => {
            const length = result.length;
            console.log("movie Ids count: " + length);
            for (let i = 0; i < length; i += 1) {
                let url = constants.detailsMovieUrlTemplate({ movieId: result[i].imdbId });
                urlsQueue.push(url);
            }
            console.log("urlsQueue length: " + urlsQueue.length);

            return Promise.resolve();
            //return Promise.all(Array.from({ length: asyncPagesCount }).map(() => getMoviesFromUrl()));
        })
        .then(() => {
            //     Promise.all(Array.from({ length: asyncPagesCount }).map(() => getMoviesFromUrl()))
            //         .then(() => {
            //             resolve();
            //         });
            return Promise.all(Array.from({ length: asyncPagesCount }).map(() => getMoviesFromUrl()));
        });
    //});
};