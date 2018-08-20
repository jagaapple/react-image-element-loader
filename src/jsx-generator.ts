// =============================================================================================================================
// SRC - JSX GENERATOR
// =============================================================================================================================
import * as svgToJSX from "svg-to-jsx";

export type JSXCodeResolver = (value?: string | PromiseLike<string>) => void;

export const generateJSXFromSVG = (svg: string, resolve: JSXCodeResolver) => {
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

export const generateJSXFromRasterImages = (resolve: JSXCodeResolver) => {
  resolve(`
    (function(props) {
      var newProps = Object.assign({}, props, { src: imagePath });

      return <img {...newProps} />
    });
  `);
};
