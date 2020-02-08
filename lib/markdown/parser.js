let createElement = require("./element.js").createElement;
let blockNodes = require("./nodes.js").blockNodes;
let inlineNodes = require("./nodes.js").inlineNodes;
let tokens = require("./tokens.js");

//Inline parser
let inlineParser = function (content) {
    let elements = []; //Initialize parsed elements
    let start = 0; //Start index
    for (let i = 0; i < content.length; i++) {
        if (["*", "`", "!", "[", "_"].indexOf(content[i]) === -1) {
            continue; //Next character
        }
        //Add the previous text
        if (start < i) {
            elements.push(createElement("text", {
                "value": content.substring(start, i)
            }));
        }
        //Find the inline element
        for (let j = 0; j < inlineNodes.length; j++) {
            let node = inlineNodes[j];
            let match = node.test.exec(content.substring(i));
            if (match === null || match.index !== 0) {
                continue; //No matched node
            }
            //Create the new element
            let element = createElement(node.name);
            node.parse(element, match, inlineParser);
            elements.push(element); //Insert element
            i = i + match[0].length; //Update current index
            break; //Stop j loop
        }
        start = i + 1; //Start is the next character
    }
    //Check for text to add
    if (start < content.length) {
        elements.push(createElement("text", {
            "value": content.substring(start)
        }));
    }
    //Return text elements
    return elements;
};

//Block parser
let blockParser = function (content) {
    let elements = []; //Processed elements
    let last = null; //To store last element metadata
    content.split("\n").forEach(function (line, index) {
        if (last !== null) {
            //Parse line with the last element type
            let next = last.node.parse(last.element, line, last.index + 1, inlineParser);
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
        for (let i = 0; i < blockNodes.length; i++) {
            let node = blockNodes[i];
            if (node.test.test(line) === false) {
                continue; //Continue with the next node
            }
            //Create a new element
            let element = createElement(node.name, {});
            if (node.parse(element, line, 0, inlineParser) === true) {
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
module.exports = function (content) {
    return blockParser(content);
};

