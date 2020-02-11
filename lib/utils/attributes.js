//Parse html attributes format
//https://stackoverflow.com/a/13898200 
module.exports = function (str) {
    let attributes = {}; //Output attributes object
    let regex = /([^\s]*)=["'](.*?)["']|([\w\-]+)/g; //Regex for capturing attributes
    let match = null;
    while ((match = regex.exec(str)) !== null) {
        if (typeof match[0] !== "string") {
            break; //Unexpected error
        }
        //Check for boolean attributes
        if (typeof match[1] !== "string") {
            attributes[match[0]] = true; //Set as boolean
        }
        else {
            //Save the attribute value
            attributes[match[1]] = match[2];
        }
    }
    //Return parsed attributes object
    return attributes;
};

