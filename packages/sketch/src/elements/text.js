import {theme} from "../theme.js";

//Export text element
export const textElement = {
    "icon": "text",
    "visibleOnToolbar": true,
    "initialConfig": {
        "textContent": "abcd",
        "textColor": "dark",
        "textSize": "medium",
        "opacity": 1.0
    },
    "draw": function (context, element) {
        context.globalAlpha = element.opacity;
        context.beginPath();
        context.font = `${theme.fontSizes[element.textSize]}px ${theme.fontFamily}`;
        context.fillStyle = theme.colors[element.textColor];
        let lines = element.textContent.replace(/\r\n?/g, "\n").split("\n");
        //let lineHeight = element.height / lines.length;
        //let offset = element.height - element.baseline;
        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], element.x, element.y + (i + 1) * theme.fontSizes[element.textSize]); 
        }
        //context.fill();
        context.globalAlpha = 1; //Reset opacity
    },
    "update": function (element) {
        //Update the text width and height
        //https://stackoverflow.com/a/19547748
        let div = document.createElement("div");
        div.innerHTML = element.textContent.replace(/\r\n?/g, "\n").split("\n").join("<br>");
        div.style.position = "absolute";
        div.style.top = "-9999px";
        div.style.left = "-9999px";
        div.style.fontFamily = theme.fontFamily;
        div.style.fontSize = theme.fontSizes[element.textSize] + "px";
        document.body.appendChild(div); //Append the div element
        element.width = div.offsetWidth; //Set computed width
        element.height = div.offsetHeight; //Set computed height
        document.body.removeChild(div); //Remove div from DOM
    }
};

