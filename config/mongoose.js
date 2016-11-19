/* globals require module */
"use strict";

const mongoose = require("mongoose");

module.exports.open = function(connectionString) {
    mongoose.connect(connectionString);
};

module.exports.close = function() {
    mongoose.connection.close();
};