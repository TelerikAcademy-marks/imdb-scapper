const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-detailActorParser");
const queuesFactory = require("../data-structures/queue");
const modelsFactory = require("../models");
const constants = require("../config/constants");
const spanTimer = require("../utils/spanTimer");

let urlsQueue = queuesFactory.getQueue();

function getActorsFromUrl() {
    if (urlsQueue.isEmpty()) {
        return Promise.resolve();
    }

    const url = urlsQueue.pop();
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const html = result.body;
            return htmlParser.parseDetailActor(html);
        })
        .then(actors => {
            let dbActors = actors.detailActors.map(actor => {
                return modelsFactory.getDetailActor(actor.name, actor.coverImgUrl, actor.biography);
            });

            dbActors.forEach((actor) => {
                actors.moviesTakenPartIn.forEach((movie) => {
                    actor.movies.push(movie);
                });
            });

            modelsFactory.insertManyDetailActors(dbActors);

            return spanTimer.wait(1000);
        })
        .then(() => {
            getActorsFromUrl();

            return Promise.resolve();
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

const asyncPagesCount = 8;

module.exports.fillDatabaseWithDetailsActors = function () {
    return new Promise((resolve, reject) => {
        //return Promise.resolve()
        //.then(() => {
        modelsFactory.getAllDetailMovies()
            //})
            .then((result) => {
                for (let i = 0; i < result.length; i += 1) {
                    let movie = result[i];
                    for (let j = 0; j < movie.actors.length; j += 1) {
                        let url = constants.detailsActorUrlTemplate({
                            actorId: movie.actors[j].imdbId,
                            listNumber: movie.actors[j].actorListNumber
                        });
                        urlsQueue.push(url);
                    }
                }

                // Array.from({ length: asyncPagesCount })
                //     .forEach(() => {
                //         getActorsFromUrl(urlsQueue.pop());
                //     });

                Promise.all(Array.from({ length: asyncPagesCount }).map(() => getActorsFromUrl()))
                    .then(() => {
                        resolve();
                    });
            });
    })
};