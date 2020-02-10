//Match regex
module.exports.match = function (line, sourceRegex, callback) {
    let regex = new RegExp(sourceRegex.source, "g"); //Clone the regex
    let match = null;
    while ((match = regex.exec(line)) !== null) {
        callback.apply(null, match); //Call with the matched url
    }
    return null;
};

//Clone a regular expression
module.exports.clone = function (regex, flags) {
    return new RegExp(regex.source, flags);
};


