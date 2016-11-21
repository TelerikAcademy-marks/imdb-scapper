/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const DetailMovie = require("./detail-movie-model");
const SimpleActor = require("./simple-actor-model");
const DetailActor = require("./detail-actor-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    insertManyDetailMovie(movies) {
        DetailMovie.insertMany(movies);
    },
    insertManySimpleActors(actors) {
        SimpleActor.insertMany(actors);
    },
    insertManyDetailActors(actors) {
        DetailActor.insertMany(actors);
    },
    getAllSimpleMovies() {
        //return SimpleMovie.find({});

        return new Promise((resolve, reject) => {
            SimpleMovie.find()
                .exec((err, res) => {
                    if (err) {
                        reject(err.message);
                    }

                    resolve(res);
                });
        });
    },
    getAllDetailMovies() {
        return DetailMovie.find({});
    },
    getDetailMovie(coverImageUrl, title, description, category, trailerUrl = "", actors) {
        return DetailMovie.detailsMovieByTitle(coverImageUrl, title, description, category, trailerUrl, actors);
    },
    getSimpleActor(url, name) {
        return SimpleActor.getSimpleActorByNameAndUrl(name, url);
    },
    getDetailActor(name, coverImgUrl, biography, movies) {
        return DetailActor.detailsActorByName(name, coverImgUrl, biography, movies);
    }
};