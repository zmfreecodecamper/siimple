//Create a basic element
module.exports.createElement = function (type, props) {
    //Initialize the new element
    let element = {
        "type": type //Set elment type
    };
    //Check for elements without children
    if (type !== "text" && type !== "image" && type !== "divider") {
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

