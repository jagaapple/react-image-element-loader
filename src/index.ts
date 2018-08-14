// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { transform } from "babel-core";
import { generateURI } from "./uri-generator";

// Prevents to get a file as string.
export const raw = true;

const transformJSX = (code: string, jsx: boolean) => {
  const options = {
    babelrc: false,
    plugins: ["syntax-jsx", "transform-object-rest-spread", "transform-object-assign"],
    presets: jsx ? [] : ["react"],
  };

  return transform(code, options);
};

export default function(this: loader.LoaderContext, source: Buffer) {
  const path = generateURI(source, this.resourcePath);
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
