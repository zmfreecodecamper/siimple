let createElement = require("./element.js").createElement;

//Method to filter nodes list
let getNodes = function (nodes, inline) {
    return nodes.filter(function (node) {
        return node.inline === inline;
    });
};

//Inline parser
let inlineParser = function (context, str) {
    let elements = []; //Initialize parsed elements
    let nodes = getNodes(context.nodes, true); //Get inline nodes
    let start = 0; //Start index
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            let node = nodes[j];
            let match = node.test.exec(str.substring(i));
            if (match === null || match.index !== 0) {
                continue; //No matched node
            }
            //Add the previous text
            if (start < i) {
                elements.push(createElement("text", {
                    "value": str.substring(start, i)
                }));
            }
            //Create the new element
            let element = createElement(node.name);
            node.parse(element, match, null, function (s) {
                return inlineParser(context, s);
            });
            elements.push(element); //Insert element
            i = i + match[0].length; //Update current index
            start = i; //Start is the last character
            break; //Stop j loop
        }
    }
    //Check for text to add
    if (start < str.length) {
        elements.push(createElement("text", {
            "value": str.substring(start)
        }));
    }
    //Return text elements
    return elements;
};

//Block parser
let blockParser = function (context, str) {
    let elements = []; //Processed elements
    let last = null; //To store last element metadata
    let nodes = getNodes(context.nodes, false); //Get block nodes
    str.split("\n").forEach(function (line, index) {
        if (last !== null) {
            //Parse line with the last element type
            let next = last.node.parse(last.element, line, last.index + 1, function (s) {
                return inlineParser(context, s);
            });
            if (next === true) {
                last.index = last.index + 1; //Update last index
                return null; //Continue with the next line
            }
            //Line is not valid --> reset last block
            last = null;
            return null; //TODO: fix for end of code or tip
        }
        //Check for empty line
        if (line.trim().length === 0) {
            return null; //TODO
        }
        //Find the block node for processing this line
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node.test.test(line) === false) {
                continue; //Continue with the next node
            }
            //Create a new element
            let element = createElement(node.name, {});
            let nextLine = node.parse(element, line, 0, function (s) {
                return inlineParser(context, s);
            });
            //if (node.parse(element, line, 0, inlineParser) === true) {
            if (nextLine === true) {
                //Create a snapshot of the node and the 
                last = {
                    "element": element,
                    "node": node,
                    "index": 0
                };
            }
            elements.push(element); //Save this element
            return null; //Next line
        }
    });
    //Return parsed markdown
    return elements;
};

//Export parser
module.exports.parseBlock = blockParser;
module.exports.parseInline = inlineParser;

