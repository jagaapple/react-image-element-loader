// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { generateJSXFromRasterImages, generateJSXFromSVG, JSXCodeResolver } from "./jsx-generator";
import { transformJSX } from "./transformer";
import { generateURI, getExtension } from "./file-utilities";

// Prevents to get a file as string.
export const raw = true;

const generateElementFunctionCode = (imagePath: string, source: Buffer) => {
  const isSVG = getExtension(imagePath) === "svg";

  return new Promise<string>((resolve: JSXCodeResolver) => {
    isSVG ? generateJSXFromSVG(source.toString("utf8"), resolve) : generateJSXFromRasterImages(resolve);
  });
};
const generateModuleCode = (imageURI: string, jsxCode: string) => `
  var React = require("react");
  var imagePath = ${JSON.stringify(imageURI)};
  module.exports = ${jsxCode};
  module.exports.path = imagePath;
`;

export default function(this: loader.LoaderContext, buffer: Buffer) {
  const callback = this.async();
  if (callback == undefined) {
    return;
  }

  Promise.resolve(buffer)
    .then((source: Buffer) => generateElementFunctionCode(this.resourcePath, source))
    .then((jsxCode: string) => {
      const path = generateURI(buffer, this.resourcePath);

      return generateModuleCode(path, jsxCode);
    })
    .then((code: string) => callback(undefined, transformJSX(code, false).code));
}
