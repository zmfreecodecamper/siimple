let createElement = require("./element.js").createElement;
let tokens = require("./tokens.js");

//Match regex
let matchRegex = function (line, sourceRegex, callback) {
    let regex = new RegExp(sourceRegex.source, "g"); //Clone the regex
    let match = null;
    while ((match = regex.exec(line)) !== null) {
        callback.apply(null, match); //Call with the matched url
    }
    return null;
};

//Parse nodes
let parseNodes = function (nodes) {
    return Object.keys(nodes).map(function (key) {
        return Object.assign(nodes[key], {
            "name": key
        });
    });
};

//Export block nodes
module.exports.blockNodes = parseNodes({
    "heading": {
        "test": tokens.heading,
        "parse": function (element, line, index, parser) {
            matchRegex(line, tokens.heading, function (full, level, text) {
                element["level"] = level.length; //Save heading level
                element["children"] = parser(text.trim());
            });
            return false; //Stop processing lines
        }
    },
    "tip": {
        "test": tokens.tipStart,
        "parse": function (element, line, index, parser) {
            if (index === 0) {
                matchRegex(line, tokens.tipStart, function (full, level, title) {
                    element["level"] = level;
                    element["title"] = title;
                });
                return true;
            }
            //Check for vlaid line --> parse line
            else if (tokens.tipEnd.test(line.trim()) === false) {
                parser(line).forEach(function (item) {
                    element.children.push(item); //Save line
                });
                return true; //process next line
            }
            //Default: stop parsing lines
            return false;
        }
    },
    "blockquote": {
        "test": tokens.blockquote,
        "parse": function (element, line, index, parser) {
            if (line.charAt(0) === ">") {
                parser(line.replace(tokens.blockquote, "")).forEach(function (item) {
                    element.children.push(item);
                });
                return true; //process next line
            }
            //Not valid line: stop block
            return false;
        }
    },
    "divider": {
        "test": tokens.divider,
        "parse": function () {
            return false; //Continue
        }
    },
    "table": {
        "test": tokens.tableRow,
        "parse": function (element, line, index, parser) {
            if (index === 0 || tokens.tableRow.test(line) === true) {
                let row = createElement((index === 0) ? "tableHeader" : "tableRow");
                matchRegex(line, tokens.tableColumn, function (full, content) {
                    let column = createElement("tableCell"); //Create the table column
                    column.children = parser(content); //Save column content
                    row.children.push(column); //Save column
                });
                element.children.push(row); //Save table row
                return true; //Continue
            }
            return false; //Not valid line
        }
    },
    "code": {
        "test": tokens.codeStart,
        "parse": function (element, line, index) {
            if (index === 0) {
                element["value"] = []; //Initialize value list
                return true; //Skip the first line
            }
            else if (tokens.codeEnd.test(line.trim()) === false) {
                element.value.push(line); //Save code line
                return true;
            }
            //Default --> end of block
            return false;
        }
    },
    "html": {
        "test": tokens.html,
        "parse": function (element, line, index) {
            if (index === 0) {
                element["value"] = []; //Initialize value list
            }
            if (line.trim().length !== 0) {
                element.value.push(line); //Save html code line
                return true;
            }
            //Empty line --> end html code block
            return false;
        }
    },
    "paragraph": {
        "test": tokens.paragraph,
        "parse": function (element, line, index, parser) {
            if (line.trim().length !== 0) {
                parser(line.trim()).forEach(function (item) {
                    element.children.push(item);
                });
                return true; //Parse next paragraph line
            }
            //Default --> end paragraph block
            return false;
        }
    }
});

//Export inline nodes
module.exports.inlineNodes = parseNodes({
    "image": {
        "test": tokens.image,
        "parse": function (element, match) {
            element["alt"] = match[1].trim(); //Save image alt caption
            element["src"] = match[2].trim(); //Save image src
        }
    },
    "link": {
        "test": tokens.link,
        "parse": function (element, match, parser) {
            element["href"] = match[2].trim(); //Save link url
            element["children"] = parser(match[1]); //Parse link children
        }
    },
    "strong": {
        "test": tokens.strong,
        "parse": function (element, match, parser) {
            element["children"] = parser(match[1]); 
        }
    },
    "emphasis": {
        "test": tokens.emphasis,
        "parse": function (element, match, parser) {
            element["children"] = parser(match[1]); 
        }
    },
    "inlineCode": {
        "test": tokens.inlineCode,
        "parse": function (element, match, parser) {
            element["value"] = match[1]; //Save inline code
        }
    }
});

