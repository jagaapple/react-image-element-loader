"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require("mime");
exports.generateURI = (source, filePath) => {
    const base64URI = source.toString("base64");
    const imageMimeType = mime.getType(filePath) || "";
    return `data:${imageMimeType};base64,${base64URI}`;
};
