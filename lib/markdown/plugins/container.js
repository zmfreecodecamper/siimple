let matchRegex = require("../../utils/regex.js").match;

//Container regex
//let containerStart = /^:::\s*(\w*)\s*(.*)\s*/;
let containerEnd = /^:::/;

//Export container plugin
module.exports = function (md, options) {
    if (typeof options.name !== "string") {
        return null; //Nothing to do
    }
    let regex = new Regex("^:::\\s*(" + options.name + ")", ""); //Container regex
    let defaultParser = function (element, line, index, parser) {
        if (index === 0) {
            return true; //Nothing to parse
        }
        //Check for vlaid line --> parse line
        else if (containerEnd.test(line.trim()) === false) {
            parser(line).forEach(function (item) {
                element.children.push(item); //Save line
            });
            return true; //process next line
        }
        //Default: stop parsing lines
        return false;
    };
    //Add the container node
    md.nodes.push({
        "name": options.name,
        "test": regex,
        "parse": (typeof options.parser === "function") ? options.parser : defaultParser
    });
};

