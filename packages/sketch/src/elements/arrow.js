import {theme} from "../theme.js";

//Export arrow element
export const arrowElement = {
    "icon": "arrow-right",
    "visibleOnToolbar": true,
    "initialConfig": {
        "strokeColor": "dark",
        "strokeWidth": "small",
        "strokeDash": false,
        "opacity": 1.0
    },
    "draw": function (context, element) {
        //Calculate the arrow size
        let size = Math.sqrt(Math.pow(element.width, 2) + Math.pow(element.height, 2));
        let xEnd = element.x + element.width; //End x-point of the arrow
        let yEnd = element.y + element.height; //End y-point of the arrow
        context.beginPath();
        context.globalAlpha = element.opacity;
        context.strokeStyle = theme.colors[element.strokeColor];
        context.lineWidth = theme.strokes[element.strokeWidth];
        context.lineCap = "square"; //square linecap
        context.setLineDash([]); //Clear line-dash style
        if (element.strokeDash === true) {
            let lineDash = theme.strokes[element.strokeWidth] * 3;
            context.setLineDash([lineDash, lineDash]);
        }
        context.moveTo(element.x, element.y);
        context.lineTo(xEnd, yEnd);
        if (size >= 10) {
            let dx = element.width; // - element.x;
            let dy = element.height; // - element.y;
            let arrowSize = 12; //Arrow line size
            let arrowAngle = Math.atan2(dy, dx); //Arrow line angle
            //First arrow line
            context.moveTo(xEnd, yEnd);
            context.lineTo(
                xEnd - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
                yEnd - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
            );
            context.moveTo(xEnd, yEnd);
            context.lineTo(
                xEnd - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                yEnd - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
            );
        }
        context.stroke();
        context.globalAlpha = 1; //Reset opacity
    },
    "update": function () {
        return null; //Nothing to do
    }
};

