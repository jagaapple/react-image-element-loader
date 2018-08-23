// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader as webpackLoader } from "webpack";
import { getOptions } from "loader-utils";
import * as validateOptions from "schema-utils";
import schema from "./schema";
import { generateElementFunctionCode, generateModuleCode } from "./code-generator";
import { transformJSX } from "./transformer";
import { generateURI } from "./file-utilities";

// Prevents to get a file as string.
export const raw = true;

export default async function(this: webpackLoader.LoaderContext, buffer: Buffer) {
  const callback = this.async();
  if (callback == undefined) {
    return;
  }

  // Gets loader options.
  const options = getOptions(this as any) || {};
  validateOptions(schema, options, "React Image Element");

  const jsxCode = await generateElementFunctionCode(buffer, this.resourcePath);
  const imageURI = await generateURI(this, buffer, this.resourcePath, options);
  const moduleCode = generateModuleCode(imageURI, jsxCode);
  const transformedModuleCode = await transformJSX(moduleCode, options.jsx || false);
  callback(undefined, transformedModuleCode.code);
}
