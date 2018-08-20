// =============================================================================================================================
// SRC - CODE GENERATOR
// =============================================================================================================================
import * as svgToJSX from "svg-to-jsx";
import { getExtension } from "./file-utilities";

const generateJSXFromSVG = (svg: string) => {
  const promise = svgToJSX(svg) as Promise<string>;
  const onFulfilled = (jsx: string) => {
    const code = jsx.replace(/<svg(.*?)>/, "<svg$1 {...props}>");

    return `(function(props) { return ${code} });`;
  };
  const onRejected = () => "{}";

  return promise.then(onFulfilled).catch(onRejected);
};

const generateJSXFromRasterImages = async () => {
  return `
    (function(props) {
      var newProps = Object.assign({}, props, { src: imagePath });

      return <img {...newProps} />
    });
  `;
};

export const generateElementFunctionCode = (imagePath: string, source: Buffer) => {
  const isSVG = getExtension(imagePath) === "svg";

  return isSVG ? generateJSXFromSVG(source.toString("utf8")) : generateJSXFromRasterImages();
};

export const generateModuleCode = (imageURI: string, jsxCode: string) => `
  var React = require("react");
  var imagePath = ${JSON.stringify(imageURI)};
  module.exports = ${jsxCode};
  module.exports.path = imagePath;
`;
