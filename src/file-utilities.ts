import { loader as webpackLoader } from "webpack";
import * as mime from "mime";
import { OptionObject } from "loader-utils";

import { getFallbackLoader } from "./fallback-loader";

export const getExtension = (filePath: string) => {
  const mimeType = mime.getType(filePath) ?? "";

  return mime.getExtension(mimeType);
};

const generateURIByFallbackLoader = async (
  loaderContext: webpackLoader.LoaderContext,
  source: Buffer,
  options: OptionObject,
) => {
  const { loader, loaderOptions } = getFallbackLoader(options.fallback);

  const fallbackLoader = typeof loader === "string" ? ((await import(loader)) as Function) : loader;
  const context = { ...loaderContext, query: loaderOptions };
  const exportModuleCode: string = fallbackLoader.call(context, source);

  return `${exportModuleCode.replace(/module.exports ?= ?/, "")}`;
};

export const generateURI = async (
  loaderContext: webpackLoader.LoaderContext,
  source: Buffer,
  filePath: string,
  options: OptionObject,
) => {
  const imageMimeType = mime.getType(filePath) ?? "";

  // When an image does not exceed the size limit, returns base64 URI.
  const sizeLimit: number | undefined = options.sizeLimit;
  if (sizeLimit != undefined && source.length <= sizeLimit) {
    const base64URI = source.toString("base64");

    return JSON.stringify(`data:${imageMimeType};base64,${base64URI}`);
  }

  // Otherwise, returns actual URI.
  return generateURIByFallbackLoader(loaderContext, source, options);
};
