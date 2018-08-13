"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babel_core_1 = require("babel-core");
const uri_generator_1 = require("./uri-generator");
exports.raw = true;
const transformJSX = (code, jsx) => {
    const options = {
        babelrc: false,
        plugins: ["syntax-jsx", "transform-object-rest-spread", "transform-object-assign"],
        presets: jsx ? [] : ["react"],
    };
    return babel_core_1.transform(code, options);
};
function default_1(source) {
    const path = uri_generator_1.generateURI(source, this.resourcePath);
    const code = `
    var React = require("react");
    var imagePath = ${JSON.stringify(path)};
    module.exports = (function(props) {
      var newProps = Object.assign({}, props, { src: imagePath });

      return <img {...newProps} />
    });
    module.exports.path = imagePath;
  `;
    this.callback(undefined, transformJSX(code, false).code);
}
exports.default = default_1;
