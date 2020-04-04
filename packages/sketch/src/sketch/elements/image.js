//Export image element
export const imageElement = {
    "icon": "image",
    "visibleOnToolbar": false,
    "initialConfig": {
        "content": null,
        "img": null,
        "opacity": 1.0
    },
    "draw": function (context, element) {
        context.globalAlpha = element.opacity;
        if (element.img !== null) {
            context.drawImage(element.img, element.x, element.y, element.width, element.height);
        }
        context.globalAlpha = 1; //Reset alpha
    },
    "update": function () {
        return null; //Nothing to do
    }
};

