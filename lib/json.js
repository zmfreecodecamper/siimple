let fs = require("fs");
let path = require("path");

//Read a JSON file
module.exports.read = function (file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
};

//Write JSON file
module.exports.write = function (file, content) {
    return fs.writeFileSync(file, JSON.stringify(content), "utf8");
};

