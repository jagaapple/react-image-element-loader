// =============================================================================================================================
// SRC - CODE GENERATOR
// =============================================================================================================================
import * as svgToJSX from "svg-to-jsx";
import { getExtension } from "./file-utilities";

type JSXCodeResolver = (value?: string | PromiseLike<string>) => void;

const generateJSXFromSVG = (svg: string, resolve: JSXCodeResolver) => {
  try {
    svgToJSX(svg, (error: Error | undefined, jsx: string) => {
      if (error != undefined) {
        throw error;
      }

      const code = jsx.replace(/<svg(.*?)>/, "<svg$1 {...props}>");
      resolve(`(function(props) { return ${code} });`);
    });
  } catch {
    resolve("{}");
  }
};

const generateJSXFromRasterImages = (resolve: JSXCodeResolver) => {
  resolve(`
    (function(props) {
      var newProps = Object.assign({}, props, { src: imagePath });

      return <img {...newProps} />
    });
  `);
};

export const generateElementFunctionCode = (imagePath: string, source: Buffer) => {
  const isSVG = getExtension(imagePath) === "svg";

  return new Promise<string>((resolve: JSXCodeResolver) => {
    isSVG ? generateJSXFromSVG(source.toString("utf8"), resolve) : generateJSXFromRasterImages(resolve);
  });
};

export const generateModuleCode = (imageURI: string, jsxCode: string) => `
  var React = require("react");
  var imagePath = ${JSON.stringify(imageURI)};
  module.exports = ${jsxCode};
  module.exports.path = imagePath;
`;
