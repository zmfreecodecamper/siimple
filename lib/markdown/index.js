let parseBlock = require("./parser.js").parseBlock;
let parseInline = require("./parser.js").parseInline;
let getNodes = require("./nodes.js");

//Initialize markdown renderer
let md = function () {
    this.nodes = getNodes(); //Get initial list of nodes
};

//Markdown api
md.prototype = {
    "use": function (plugin, options) {
        return plugin(this, options);
    },
    "parse": function (str) {
        return parseBlock(this, str);
    },
    "parseInline": function (str) {
        return parseInline(this, str);
    }
};

//Export markdown parser
module.exports = function () {
    return new md();
};

//Export plugins
module.exports.plugins = {
    "container": require("./plugins/container.js")
};

