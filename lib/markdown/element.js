//Elements without children field
let noChildren = ["inlineCode", "html", "code", "text", "image", "divider"];

//Create a basic element
module.exports.createElement = function (type, props) {
    //Initialize the new element
    let element = {
        "type": type //Set elment type
    };
    //Check for elements without children
    if (noChildren.indexOf(type) === -1) {
        Object.assign(element, {
            "children": []
        });
    }
    //Check for props object
    if (typeof props === "object" && props !== null) {
        Object.assign(element, props);
    }
    //Return the new element
    return element;
};

