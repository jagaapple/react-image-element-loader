import * as svgToJSX from "svg-to-jsx";

import { getExtension } from "./file-utilities";

const generateJSXFromSVG = async (svg: string) => {
  const promise: Promise<string> = svgToJSX(svg);
  const onFulfilled = (jsx: string) => {
    const code = jsx.replace(/<svg(.*?)>/, "<svg$1 {...props}>");

    return `(function(props) { return ${code} });`;
  };
  const onRejected = () => "{}";

  return promise.then(onFulfilled).catch(onRejected);
};

const generateJSXFromRasterImages = async () => `
  (function(props) {
    var newProps = Object.assign({}, props, { src: imagePath });

    return <img {...newProps} />;
  });
`;

export const generateElementFunctionCode = (source: Buffer, filePath: string) => {
  const isSVG = getExtension(filePath) === "svg";

  return isSVG ? generateJSXFromSVG(source.toString("utf8")) : generateJSXFromRasterImages();
};

export const generateModuleCode = (imageURI: string, jsxCode: string) => `
  var React = require("react");
  var imagePath = ${imageURI};

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = imagePath;
  exports.element = ${jsxCode};
`;
