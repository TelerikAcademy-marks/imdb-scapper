/* globals Promise */
"use strict";

module.exports.wait = function (time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};