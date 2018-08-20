// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { generateElementFunctionCode, generateModuleCode } from "./code-generator";
import { transformJSX } from "./transformer";
import { generateURI } from "./file-utilities";

// Prevents to get a file as string.
export const raw = true;

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
