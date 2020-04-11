let fs = require("fs");
let path = require("path");
let express = require("express");

process.nextTick(function () {
    let app = express();
    //Enable cors
    //app.use(function (req, res, next) {
    //    res.header("Access-Control-Allow-Origin", "*");
    //    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    //    return next();
    //});
    //Serve static files
    app.use("/", express.static(path.join(process.cwd(), "www")));
    //Serve main app
    app.use("*", function (req, res) {
        let filePath = path.join(process.cwd(), "www", "index.html");
        return fs.readFile(filePath, "utf8", function (error, content) {
            return res.type("html").send(content);
        });
    });
    //Listen to default port
    app.listen(5000, function () {
        console.log("Serving at port 5000");
    });
});

