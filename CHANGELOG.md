# Changelog
## 2.0.0 (2019-11-30)
- Change API - [@jagaapple](https://github.com/jagaapple)
  - In v1, image paths are exported by `path` property like `import { path } from "./xxx.png";`
  - From v2, image paths are exported by default like `import path from "./xxx.png";`
  - In v1, React image elements are exported by default like `import Image from "./xxx.png";`
  - From v2, React image elements are exported by `element` property like `import { element as Image } from "./xxx.png";`
- Add support for Babel 7
- Update dependencies
- Update development envrironment
  - Use `webpack-dev-server` instead of `webpack-serve`
  - Use ESLint instead of TSLint
- Modify a readme

## 1.1.0 (2018-08-23)
- Add "jsx" option - [@jagaapple](https://github.com/jagaapple)
  - Add "jsx" option to enable output JSX code instead of `React.createElement` function
  - Add documentation about "jsx" option to a readme file
- Add a badge to show latest publish version on npmjs.com and link to a readme file - [@jagaapple](https://github.com/jagaapple)

## 1.0.1 (2018-08-22)
- Update a readme file - [@jagaapple](https://github.com/jagaapple)
  - Modify sample codes realted to options
  - Add a recipe to enable type definitions for TypeScript

## 1.0.0 (2018-08-22)
- Initial public release - [@jagaapple](https://github.com/jagaapple)

## 0.1.0 (2018-08-10)
- Initial private release - [@jagaapple](https://github.com/jagaapple)
