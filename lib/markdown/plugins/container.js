let matchRegex = require("../../utils/regex.js").match;
let attributes = require("../../utils/attributes.js");

//Container regex
//let containerStart = /^:::\s*(\w*)\s*(.*)\s*/;
let containerEnd = /^:::/;

//Export container plugin
module.exports = function (md, options) {
    if (typeof options.name !== "string") {
        return null; //Nothing to do
    }
    let regex = new Regex("^:::\\s*(" + options.name + ")\\s*(.*)\\s*", ""); //Container regex
    let defaultParser = function (element, line, index, parser) {
        if (index === 0) {
            //Parse the container attributes
            matchRegex(line, regex, function (full, type, args) {
                if (args === "") {
                    return null; //Nothing to parse
                }
                Object.assign(element, attributes(args)); //Parse and merge attributes
                element.children = []; //Prevent children override
            });
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

