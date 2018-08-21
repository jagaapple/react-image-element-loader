// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { getOptions } from "loader-utils";
import * as validateOptions from "schema-utils";
import schema from "./schema";
import { generateElementFunctionCode, generateModuleCode } from "./code-generator";
import { transformJSX } from "./transformer";
import { generateURI } from "./file-utilities";

// Prevents to get a file as string.
export const raw = true;

export default async function(this: loader.LoaderContext, buffer: Buffer) {
  const callback = this.async();
  if (callback == undefined) {
    return;
  }

  // Gets loader options.
  const options = getOptions(this as any) || {};
  validateOptions(schema, options, "React Image Element");

  const jsxCode = await generateElementFunctionCode(this.resourcePath, buffer);
  const path = generateURI(buffer, this.resourcePath);
  const code = generateModuleCode(path, jsxCode);
  const transformedCode = await transformJSX(code, false);
  callback(undefined, transformedCode.code);
}
