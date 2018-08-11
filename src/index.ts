// =============================================================================================================================
// SRC - IDNEX
// =============================================================================================================================
import { loader } from "webpack";
import { generateURI } from "./uri-generator";

export const raw = true;

export default function(this: loader.LoaderContext, source: Buffer) {
  const path = generateURI(source, this.resourcePath);

  return `module.exports.path = ${JSON.stringify(path)};`;
}
