let fs = require("fs");
let path = require("path");

//Read a JSON file
module.exports.readJSON = function (file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
};

//Write JSON file
module.exports.writeJSON = function (file, content) {
    return fs.writeFileSync(file, JSON.stringify(content), "utf8");
};

