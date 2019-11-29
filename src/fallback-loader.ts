import { parseQuery } from "loader-utils";

type LoaderObject = {
  loader: (...args: any) => any;
  options: object;
};

const defualtLoader = "file-loader";
export const getFallbackLoader = (fallbackLoader?: string | LoaderObject) => {
  let loader: string | LoaderObject["loader"];
  let loaderOptions: object = {};

  switch (typeof fallbackLoader) {
    case "object":
      loader = fallbackLoader.loader;
      loaderOptions = fallbackLoader.options;

      break;
    case "string":
      const queryIndex = fallbackLoader.indexOf("?");

      loader = fallbackLoader.substr(0, queryIndex);
      loaderOptions = parseQuery(fallbackLoader.substr(queryIndex));

      break;
    default:
      loader = defualtLoader;

      break;
  }

  return { loader, loaderOptions };
};
