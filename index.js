require("babel-register");

require("babel-polyfill");

let server = "";

if(process.env.NODE_ENV === "development") {
    server = require("./server/app.dev");
}else {
    server = require("./server/app");
}

module.exports = server;