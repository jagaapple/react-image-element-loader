"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri_generator_1 = require("./uri-generator");
exports.raw = true;
function default_1(source) {
    const path = uri_generator_1.generateURI(source, this.resourcePath);
    return `module.exports.path = ${JSON.stringify(path)};`;
}
exports.default = default_1;
