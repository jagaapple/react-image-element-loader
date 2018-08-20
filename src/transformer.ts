// =============================================================================================================================
// SRC - TRANSFORMER
// =============================================================================================================================
import { transform } from "babel-core";

export const transformJSX = (code: string, jsx: boolean) => {
  const options = {
    babelrc: false,
    plugins: ["syntax-jsx", "transform-object-rest-spread", "transform-object-assign"],
    presets: jsx ? [] : ["react"],
  };

  return transform(code, options);
};
