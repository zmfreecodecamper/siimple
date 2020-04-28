let path = require("path");

//Resolve to docs folder
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

module.exports = {
    "root": resolveTo("../"),
    "packages": resolveTo("../../packages"),
    "config": resolveTo("../config.json"),
    "partials": resolveTo("../partials"),
    "template": resolveTo("../page.html"),
    "build": resolveTo("../www/")
};


