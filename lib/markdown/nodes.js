let createElement = require("./element.js").createElement;
let tokens = require("./tokens.js");
let matchRegex = require("../utils/regex.js").match;

//Parse nodes
let parseNodes = function (nodes) {
    return Object.keys(nodes).map(function (key) {
        return Object.assign(nodes[key], {
            "name": key
        });
    });
};

//Export block nodes
module.exports = function () {
    return parseNodes({
        "heading": {
            "test": tokens.heading,
            "inline": false,
            "parse": function (element, line, index, parser) {
                matchRegex(line, tokens.heading, function (full, level, text) {
                    element["level"] = level.length; //Save heading level
                    element["children"] = parser(text.trim());
                });
                return false; //Stop processing lines
            }
        },
        "blockquote": {
            "test": tokens.blockquote,
            "inline": false,
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
        "rule": {
            "test": tokens.rule,
            "inline": false,
            "parse": function () {
                return false; //Continue
            }
        },
        "table": {
            "test": tokens.tableRow,
            "inline": false,
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
            "inline": false,
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
            "inline": false,
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
            "inline": false,
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
        },
        "image": {
            "inline": true,
            "test": tokens.image,
            "parse": function (element, match) {
                element["alt"] = match[1].trim(); //Save image alt caption
                element["src"] = match[2].trim(); //Save image src
            }
        },
        "link": {
            "inline": true,
            "test": tokens.link,
            "parse": function (element, match, index, parser) {
                element["href"] = match[2].trim(); //Save link url
                element["children"] = parser(match[1]); //Parse link children
            }
        },
        "strong": {
            "inline": true,
            "test": tokens.strong,
            "parse": function (element, match, index, parser) {
                element["children"] = parser(match[1]); 
            }
        },
        "emphasis": {
            "inline": true,
            "test": tokens.emphasis,
            "parse": function (element, match, index, parser) {
                element["children"] = parser(match[1]); 
            }
        },
        "inlineCode": {
            "inline": true,
            "test": tokens.inlineCode,
            "parse": function (element, match, index, parser) {
                element["value"] = match[1]; //Save inline code
            }
        }
    });
};

