/* globals require module */
"use strict";

const mongoose = require("mongoose");

// Use native promises
mongoose.Promise = global.Promise;

// http://mongoosejs.com/docs/promises.html
var options = {
    server: {
        socketOptions: {
            keepalive: 1
        }
    },
    promiseLibrary: global.Promise
};

module.exports.open = function (connectionString) {
    mongoose.connect(connectionString, options);
};

module.exports.close = function () {
    mongoose.connection.close();
};

//====================

// let db = mongoose.createConnection();
// db.on("close", () => {
//     console.log("connection closed");
// });
// db.on("open", () => {
//     console.log("Connected to mongo server.");
// });
// db.on("error", error => {
//     console.log(error);
//     db.close();
// });

// db.open(url, {
//     url: URI,
//     user: USER,
//     pass: PASS,
//     options: {
//         server: {
//             socketOptions: {
//                 keepalive: 1
//             }
//         }
//     }
// });