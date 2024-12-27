"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
function EmbeddedPage(props) {
    return ((0, jsx_runtime_1.jsx)("iframe", { style: {
            border: "none",
            display: "block",
            // transform: "scale(0.8)",
        }, src: props.url, width: props.width, height: props.height, title: props.title }));
}
exports.default = EmbeddedPage;
