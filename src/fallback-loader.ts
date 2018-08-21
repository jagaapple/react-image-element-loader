// =============================================================================================================================
// SRC - FALLBACK LOADER
// =============================================================================================================================
import { parseQuery } from "loader-utils";

interface LoaderObject {
  loader: Function;
  options: object;
}

const defualtLoader = "file-loader";
export const getFallbackLoader = (fallbackLoader?: string | LoaderObject) => {
  let loader: string | Function;
  let loaderOptions = {};

  if (typeof fallbackLoader === "object") {
    loader = fallbackLoader.loader;
    loaderOptions = fallbackLoader.options;
  } else if (typeof fallbackLoader === "string") {
    const queryIndex = fallbackLoader.indexOf("?");

    loader = fallbackLoader.substr(0, queryIndex);
    loaderOptions = parseQuery(fallbackLoader.substr(queryIndex));
  } else {
    loader = defualtLoader;
  }

  return { loader, loaderOptions };
};
