/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window),
    constants = require("../config/constants");

function setMovieTitle(modelItem) {
    $(constants.detailsMovieSelectors[0]).each((index, item) => {
        const $item = $(item);
        $item.children().remove();

        modelItem.title = $item.text().trim();
    });
}

function setMovieImageUrl(modelItem) {
    $(constants.detailsMovieSelectors[1]).each((index, item) => {
        const $item = $(item);

        modelItem.coverImgUrl = $item.attr("src");
    });
}

function setMovieTrailerUrl(modelItem) {
    $(constants.detailsMovieSelectors[2]).each((index, item) => {
        const $item = $(item);

        modelItem.trailerUrl = $item.attr("href");
    });
}

function setMovieDesription(modelItem) {
    $(constants.detailsMovieSelectors[3]).each((index, item) => {
        const $item = $(item);

        modelItem.description = $item.text();
    });
}

function setMovieGenres(modelItem) {
    $(constants.detailsMovieSelectors[4]).each((index, item) => {
        const $item = $(item);

        modelItem.genres = $item.text().trim();
    });
}

function setSimpleActors(actors) {
    $(constants.detailsMovieSelectors[5]).each((index, item) => {
        const $item = $(item);

        actors.push({
            url: $item.attr("href"),
            name: $item.text()
        });
    });
}

module.exports.parseDetailMovie = (html) => {
    $("body").html(html);
    let items = [];
    let simpleActors = [];
    let itemToAdd = {};

    setMovieTitle(itemToAdd);
    setMovieImageUrl(itemToAdd);
    setMovieTrailerUrl(itemToAdd);
    setMovieDesription(itemToAdd);
    setMovieGenres(itemToAdd);
    setSimpleActors(simpleActors);

    items.push(itemToAdd);

    return Promise.resolve()
        .then(() => {
            return {
                detailMovies: items,
                actors: simpleActors
            };
        });
};