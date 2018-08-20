// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { transform } from "babel-core";
import * as svgToJSX from "svg-to-jsx";
import { generateURI, getExtension } from "./uri-generator";

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

const generateElementFunctionCode = (imagePath: string, source: Buffer) => {
  const isSVG = getExtension(imagePath) === "svg";

  return new Promise<string>((resolve: (value?: string | PromiseLike<string>) => void) => {
    try {
      if (isSVG) {
        const svg = source.toString("utf8");
        svgToJSX(svg, (error: Error | undefined, jsx: string) => {
          if (error != undefined) {
            throw error;
          }

          const code = jsx.replace(/<svg(.*?)>/, `<svg$1 {...props}>`);
          resolve(`
            (function(props) {
              return ${code};
            });
          `);
        });

        return;
      }
    } catch {
      resolve("{}");

      return;
    }

    resolve(`
      (function(props) {
        var newProps = Object.assign({}, props, { src: imagePath });

        return <img {...newProps} />
      });
    `);
  });
};

export default function(this: loader.LoaderContext, buffer: Buffer) {
  const callback = this.async();
  if (callback == undefined) {
    return;
  }

  Promise.resolve(buffer)
    .then((source: Buffer) => generateElementFunctionCode(this.resourcePath, source))
    .then((code: string) => {
      const path = generateURI(buffer, this.resourcePath);

      return `
        var React = require("react");
        var imagePath = ${JSON.stringify(path)};
        module.exports = ${code};
        module.exports.path = imagePath;
      `;
    })
    .then((code: string) => callback(undefined, transformJSX(code, false).code));
}
