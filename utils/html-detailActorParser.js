/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window),
    constants = require("../config/constants");

function setActorName(modelItem) {
    $(constants.detailsActorSelectors[0]).each((index, item) => {
        const $item = $(item);

        modelItem.name = $item.text().trim();
    });
}

function setActorImageUrl(modelItem) {
    $(constants.detailsActorSelectors[1]).each((index, item) => {
        const $item = $(item);

        modelItem.coverImgUrl = $item.attr("src");
    });
}

function setActorBiography(modelItem) {
    $(constants.detailsActorSelectors[2]).each((index, item) => {
        const $item = $(item);

        modelItem.biography = $item.text().trim();
    });
}

function setMovies(movies) {
    $(constants.detailsActorSelectors[3]).each((index, item) => {
        const $item = $(item)

        let movieName = $item.first()
            .find($("div b a"))
            .text()
            .trim();

        let movieId = $item.first()
            .find($("div b a"))
            .attr("href");

        // Without actor role. Try to select it and you will see why

        if (movieName !== "") {
            movies.push({
                name: movieName,
                id: movieId
            });
        }
    });
}

module.exports.parseDetailActor = (html) => {
    $("body").html(html);
    let items = [];
    let movies = [];
    let itemToAdd = {};

    setActorName(itemToAdd);
    setActorImageUrl(itemToAdd);
    setActorBiography(itemToAdd);
    setMovies(movies);

    if (itemToAdd.coverImgUrl !== undefined) {
        items.push(itemToAdd);
    }

    return Promise.resolve()
        .then(() => {
            return {
                detailActors: items,
                moviesTakenPartIn: movies
            };
        });
};