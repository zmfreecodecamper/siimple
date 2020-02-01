//Export default resize radius
export const resizeRadius = 5;

//Get resize points
export function getResizePoints (element) {
    //Check for rectangle or ellipse
    if (element.type === "rectangle" || element.type === "ellipse") {
        return [
            {"orientation": "ltd", "x": element.x, "y": element.y},
            {"orientation": "tv", "x": element.x + element.width / 2, "y": element.y},
            {"orientation": "rtd", "x": element.x + element.width, "y": element.y},
            {"orientation": "lh", "x": element.x, "y": element.y + element.height / 2},
            {"orientation": "rh", "x": element.x + element.width, "y": element.y + element.height / 2},
            {"orientation": "lbd", "x": element.x, "y": element.y + element.height},
            {"orientation": "rbd", "x": element.x + element.width, "y": element.y + element.height},
            {"orientation": "bv", "x": element.x + element.width / 2, "y": element.y + element.height},
        ];
    }
    //Check for line or arrow
    else if (element.type === "line" || element.type === "arrow") {
        return [
            {"orientation": "ltd", "x": element.x, "y": element.y},
            {"orientation": "rbd", "x": element.x + element.width, "y": element.y + element.height}
        ];
    }
    //Default: no resize points
    return [];
}

//Check if the cursor is inside a resize point
export function inResizePoint (element, x, y) {
    let points = getResizePoints(element);
    //Check for no resize points of this element
    if (points.length === 0) {
        return null;
    }
    //Check for each resize point
    for (let i = 0; i < points.length; i++) {
        if (points[i].x - resizeRadius <= x && x <= points[i].x + resizeRadius) {
            if (points[i].y - resizeRadius <= y && y <= points[i].y + resizeRadius) {
                return points[i];
            }
        }
    }
    //Default: no resize point found
    return null;
}

