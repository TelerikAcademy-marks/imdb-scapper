/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const MovieDetails = require("./movie-detailes-model");
const SimpleActor = require ("./simple-actors-model");
const ActorDetails = require("./actor-detailes-model");
const MovieActor = require("./movie-actor-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },

    getMovieDetails(coverImageUrl, title, description, category, relaseDate, actors, trailerUrl=""){
        return Movie
    },
    insertManyMoviesDatails(movies){
        MovieDetails.insertMany(movies)
    },

  getActorDetails(profilImageUrl, name, biography, movies){
        return Movie
    },
    insertManyActorsDatails(movies){
        ActorDetails.insertMany(movies)
    }
  };