const _ = require("lodash");

module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    pagesCount: 1,
    moviesUrlTemplate: _.template("http://www.imdb.com/search/title?genres=<%= genreType %>&title_type=feature&0sort=moviemeter,asc&page=<%= page %>&view=simple&ref_=adv_nxt"),
    detailsMovieUrlTemplate: _.template("http://www.imdb.com/title/<%= movieId %>/?ref_=adv_li_tt"),
    detailsMovieSelectors: [".title_wrapper h1", ".poster a img", ".slate a", "#titleStoryLine [itemprop='description'] p", "#titleStoryLine [itemprop='genre'] a", "#titleCast .cast_list tr td[itemprop='actor'] a[itemprop='url']"],
    detailsActorUrlTemplate: _.template("http://www.imdb.com/name/<%= actorId %>/?ref_=tt_cl_t<%= listNumber %>"),
    detailsActorSelectors: ["#overview-top h1 span[itemprop='name']", ".image a #name-poster", "#name-bio-text div div[itemprop='description']", "#filmography .filmo-category-section div"]
};