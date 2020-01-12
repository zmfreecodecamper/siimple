import {jumbotron} from "./jumbotron.js";
import {features} from "./features.js";
import {pricing} from "./pricing.js";
import {faq} from "./faq.js";

//Export element types
export const elements = {
    "jumbotron": jumbotron,
    "features": features,
    "pricing": pricing,
    "faq": faq
};

//Get available elements
export function getElements () {
    return Object.keys(elements);
}

//Get element props
export function getElementProps (name) {
    return elements[name].props;
}

//Get element render
export function getElementRender (name) {
    return elements[name].render;
}
