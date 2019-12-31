let fs = require("fs");
let path = require("path");
let docs = require("./package.json").packages;

process.nextTick(function () {
    //Build documentation packages data
    let data = Object.keys(docs).map(function (key) {
        let inputPath = path.resolve(process.cwd(), path.join("..", docs[key], "package.json"));
        let pkg = JSON.parse(fs.readFileSync(inputPath, "utf8"));
        return {
            "name": pkg.name,
            "description": pkg.description,
            "version": pkg.version,
            "path": path.join("/", key, "index.html"),
            "type": "CSS TOOLKIT"
        };
    });
    //Write packages
    let outputPath = path.join(process.cwd(), "data", "packages.json");
    fs.writeFileSync(outputPath, JSON.stringify(data, null, "    "), "utf8");
});

