let fs = require("fs");
let path = require("path");
let markdown = require("../../commons/markdown.js");
let template = require("../../commons/template.js");
let virtualFile = require("../../commons/virtual-file.js");
let util = require("../../commons/util.js");

let paths = require("./paths.js");
let tips = {
    "info": "siimple-tip--primary siimple-tip--info",
    "error": "siimple-tip--error siimple-tip--cross",
    "warning": "siimple-tip--warning siimple-tip--exclamation",
    "success": "siimple-tip--success siimple-tip--check"
};
let staticPages = ["index.html"];

//Classnames list
let classNames = {
    "h1": "siimple-h1",
    "h2": "siimple-h2",
    "h3": "siimple-h3",
    "h4": "siimple-h4",
    "h5": "siimple-h5",
    "h6": "siimple-h6",
    "blockquote": "siimple-blockquote",
    "rule": "siimple-rule",
    "table": "siimple-table",
    "tableHeader": "siimple-table-header",
    "tableBody": "siimple-table-body",
    "tableRow": "siimple-table-row",
    "tableCell": "siimple-table-cell",
    "code": "siimple-pre",
    "paragraph": "siimple-paragraph",
    "link": "siimple-link",
    "inlineCode": "siimple-code"
};

//Register handlebars partials
let registerPartials = function () {
    return fs.readdirSync(paths.partials, {"encoding": "utf8"}).forEach(function (file) {
        let content = fs.readFileSync(path.join(paths.partials, file), "utf8");
        return template.registerPartial(file, content);
    });
};

//Build package files tree
let buildPackageTree = function (pkgName, pkgPath, items) {
    let groups = []; //Initialize groups items
    let currentGroup = null; //Current group
    items.forEach(function (item) {
        if (typeof item.group === "string") {
            groups.push({
                "title": item.group,
                "link": null, //Link to the first page of this group
                "pages": []
            });
            currentGroup = groups[groups.length - 1]; //Get current group
            return; //Continue with the next item
        }
        let file = virtualFile(path.join(pkgPath, "docs", item.page)); //Create the new virtual file
        virtualFile.read(file); //Read virtual file content
        //Build the output filename
        let outputFilePath = path.normalize(path.format({
            "root": "/",
            "dir": path.join("/", pkgName, path.dirname(item.page)),
            "name": path.basename(item.page, path.extname(item.page)),
            "ext": ".html"
        }));
        let currentIndex = currentGroup.pages.length; //Get current index
        //Insert this page
        currentGroup.pages.push({
            "index": currentIndex,
            "file": file,
            "title": file.data.title,
            "link": outputFilePath
        });
    });
    //Parse groups to get the link to the first page of each group
    return groups.map(function (group, index) {
        return Object.assign(group, {
            "index": index,
            "link": group.pages[0].link
        });
    });
};

//Build page sidebar
let buildPageSidebar = function (groups, groupIndex, pageIndex) {
    let sidebarItems = []; //Initialize sidebar items
    groups.forEach(function (group, i) {
        let groupActive = i === groupIndex;
        sidebarItems.push({
            "title": group.title,
            "link": group.link,
            "active": groupActive,
            "type": "group"
        });
        //Check if this group is not active
        if (groupActive === false) {
            return; //Continue with the next group
        }
        //Add pages of this group
        return group.pages.forEach(function (page, j) {
            sidebarItems.push({
                "title": page.title,
                "link": page.link,
                "active": j === pageIndex,
                "type": "page"
            });
        });
    }); 
    //Return sidebar items
    return sidebarItems;
};

process.nextTick(function () {
    let config = util.readJSON(paths.config); //Import site config
    //Initialize markdown configuration
    Object.keys(tips).forEach(function (name) {
        return markdown.registerContainer("tip:" + name, {
            "render": function (element, children) {
                let content = [];
                content.push(`<div class="siimple-tip ${tips[name]}">`);
                if (typeof element.title === "string") {
                    content.push(`<div class="siimple-h6">${element.title}</div>`);
                }
                content.push(children);
                content.push(`</div>`);
                return content.join("\n");
            }
        });
    });
    markdown.registerContainer("snippet", {
        "parseContent": false,
        "render": function (element) {
            //let children = util.escapeHtml(element.children.join("\n"));
            //return util.createElement("pre", {}, children);
            return "";
        }
    });
    registerPartials(); //Register handlebars partials
    let pageTemplate = template.page({
        "header": config.header,
        "body": fs.readFileSync(paths.template, "utf8")
    });
    let compilePageTemplate = function (content) {
        return pageTemplate.replace(/\{\{(?:\s*)(content)(?:\s*)\}\}/g, content);
    };
    let data = {}; //Store global data object
    //walkDir(paths.dataSrc, [".json"], function (file) {
    //    let name = path.basename(file, ".json"); //Get data name
    //    data[name] = readJSON(path.join(paths.dataSrc, file));
    //});
    //Build packages
    Object.keys(config.packages).forEach(function (name) {
        //Import package info
        let pkgPath = path.join(paths.packages, config.packages[name]);
        let package = util.readJSON(path.join(pkgPath, "package.json"));
        let pages = util.readJSON(path.join(pkgPath, "docs", "config.json")); //Import pages
        //delete config.packages[name].folder; //Delete folder key
        let packageTree = buildPackageTree(name, pkgPath, pages); //Build package tree
        let firstPage = packageTree[0].pages[0]; //Get first page
        //Add package metadata
        config.packages[name] = Object.assign({}, {
            "name": package.name,
            "version": package.version,
            "description": package.description,
            "link": firstPage.link
        });
        //Build pages
        packageTree.forEach(function (group, groupIndex) {
            //Build each page of the group
            return group.pages.forEach(function (page, pageIndex) {
                //Compile page content
                let pageContentTree = markdown.render(markdown.parse(page.file.content), {
                    "className": classNames
                });
                let pageSidebar = buildPageSidebar(packageTree, groupIndex, pageIndex);
                let pageBreadcrumb = [
                    {"title": package.name, "link": firstPage.link},
                    {"title": group.title, "link": group.link},
                    {"title": page.title, "link": "#", "active": true}
                ];
                //Generate page content
                let pageContent = template.compile(compilePageTemplate(pageContentTree), {
                    "package": config.packages[name],
                    "site": config,
                    "page": {
                        "url": page.link,
                        "title": page.title,
                        "sidebar": pageSidebar,
                        "breadcrumb": pageBreadcrumb
                    },
                    "data": data,
                    "title": "Hello world"
                });
                //Update the virtualfile with the new folder and paths
                let file = Object.assign({}, page.file, {
                    "dirname": path.join(paths.build, path.dirname(page.link)),
                    "content": pageContent,
                    "extname": ".html"
                });
                //Write the virtual file
                virtualFile.write(file);
            });
        });
    });
    //Write configuration file
    //json.write(paths.buildConfig, config);
    //fs.writeFileSync(paths.buildConfig, jsonToString(config), "utf8");
    //Build static pages
    staticPages.forEach(function (page) {
        let file = virtualFile(path.join(paths.root, page)); //Create the new virtual file
        virtualFile.read(file); //Read virtual file content
        //Generate page content
        let fileTemplate = template.page({
            "header": config.header,
            "body": file.content
        });
        let pageContent = template.compile(fileTemplate, {
            "packages": config.packages,
            "site": config,
            "page": {},
            "data": data,
            "title": "Hello world"
        });
        //Update the virtual file metadata
        Object.assign(file, {
            "dirname": paths.build,
            "content": pageContent
        });
        //Write the file
        virtualFile.write(file);
    });
});

