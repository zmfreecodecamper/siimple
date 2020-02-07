let fs = require("fs");
let path = require("path");
let yaml = require("js-yaml");

//Front matter regex
let frontMatter = /^-{3}(?:[^\r\n]*?)(?:\r?\n)([\s\S]*?)^-{3}(?:[\s\S]*?)(?:\r?\n)/m;

//Virtual file generator
module.exports.read = function (filePath) {
    let fileContent = fs.readFileSync(filePath, "utf8").trim();
    //Initialize the virtual file object
    let vfile = {
        "dirname": path.dirname(filePath),
        //"basename": path.basename(filePath),
        "filename": path.basename(filePath, path.extname(filePath)),
        "extname": path.extname(filePath),
        //"path": filePath,
        "data": {},
        "content": fileContent
    };
    //Check if file starts with three '-'
    if (fileContent.indexOf("---") === 0) {
        //Overwrite the file content and parse the front matter
        vfile.content = fileContent.replace(frontMatter, function (match, block) {
            vfile.data = Object.assign({}, yaml.safeLoad(block));
            return ""; //Remove the front-matter section
        });
    }
    return vfile;
};

//Write a vfile
module.exports.write = function (vfile) {
    let filePath = path.format({
        "root": "/",
        "dir": vfile.dirname,
        "name": vfile.filename,
        "ext": vfile.extname
    });
    //Write the file content
    fs.writeFileSync(filePath, vfile.content, "utf8");
};

