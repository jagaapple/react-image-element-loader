# react-image-element-loader

[![npm](https://img.shields.io/npm/v/react-image-element-loader.svg)](https://www.npmjs.com/package/react-image-element-loader)
[![license](https://img.shields.io/github/license/jagaapple/react-image-element-loader.svg)](https://opensource.org/licenses/MIT)
[![@jagaapple_tech](https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg)](https://twitter.com/jagaapple_tech)

This loader creates React element or extracts file path from images (PNG/JPEG/GIF/SVG) for webpack.


## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
  - [Get React element from raster images](#get-react-element-from-raster-images)
  - [Get React element from SVG images](#get-react-element-from-svg-images)
  - [Get an image path](#get-an-image-path)
- [Options](#options)
  - [`sizeLimit`](#sizelimit)
  - [`jsx`](#jsx)
  - [`fallback`](#fallback)
- [Recipes](#recipes)
  - [Styling SVG](#styling-svg)
  - [Specifies SVG as `background-image` in styles](#specifies-svg-as-background-image-in-styles)
  - [Enables type definitions for `import` syntax for TypeScript](#enables-type-definitions-for-import-syntax-for-typescript)
- [Contributing to react-image-element-loader](#contributing-to-react-image-element-loader)
- [License](#license)

<!-- /TOC -->


## Features
```jsx
import styled from "styled-components";
import PhotoImage, { path as photoImagePath } from "./photo.jpg";
import LogoImage, { path as logoImagePath } from "./logo.svg";

const ContainerElement = styled.div`
  background-image: url("${photoImagePath}");
`;

export default () => (
  <ContainerElement>
    <PhotoImage alt="flower" />
    <LogoImage width="230" height="140" />
  </ContainerElement>
);
```

- Import images as inline images (Base 64) using JavaScript Module Syntax ( `import` or `require` )
  - When the image exceeds a specified size limit, it returns actual URL
- Import raster images as React element `<img src="xxx" />` using JavaScript Module Syntax
  - It is possible to pass HTMLAttributes props such as `alt`
- Import SVG images as React element `<svg>...</svg>` using JavaScript Module Syntax
  - It is possible to pass SVGAttributes props such as `fill`
- Supports type definitions for images for TypeScript
  - You should configure, see more detail [here](#enables-type-definitions-for-import-syntax-for-typescript)


## Quick Start
### Requirements
- npm or Yarn
- webpack 4.0.0 or higher

### Installation

```bash
$ npm install --save react-image-element-loader
```

If you are using Yarn, use the following command.

```bash
$ yarn add react-image-element-loader
```

### Setup
First, setup your webpack settings.

```js
// webpack.config.js
module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: { ... },
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "react-image-element-loader",
        exclude: /node_modules/,
      },
      ...
    ],
  },
  ...
};
```

You can pass an object to "loader" instead of string `"react-image-element-loader"` .

```js
// webpack.config.js
const reactImageElementLoader = require("react-image-element-loader");
...

{
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: reactImageElementLoader,
  exclude: /node_modules/,
},
```


## Usage
### Get React element from raster images
You can import raster images as React element `<img />` . It is possible to pass HTMLAttributes, but `src` will be ignored.

```jsx
import PhotoImage from "./photo.jpg";
// or: const PhotoImage = require("./photo.jpg");

export default () => (
  <div>
    <PhotoImage />
    <PhotoImage width="100" alt="flower" />

    {/* src will be ignored. */}
    <PhotoImage src="other-image.jpg" />
  </div>
);
```

Raster images supported by react-image-element-loader are PNG (.png), JPEG (.jpg), and GIF (.gif).

### Get React element from SVG images
You can import SVG images as React element `<svg>...</svg>` . It is possible to pass SVGAttributes.

```jsx
import LogoImage from "./logo.svg";
// or: const LogoImage = require("./logo.svg");

export default () => (
  <div>
    <LogoImage width="230" height="140" />
    <LogoImage fill="red" />
  </div>
);
```

### Get an image path
You can get an image path (URL) of raster or SVG image.

```jsx
import { path as imagePath } from "./photo.jpg";
// or: const imagePath = require("./photo.jpg").path;

export default () => (
  <div>
    <img src={imagePath} />
  </div>
);
```

In generally, `path` is an actual image URL (through [file-loader](https://github.com/webpack-contrib/file-loader)). When you
use `sizeLimit` option and the image is smaller than `sizeLimit` , `path` is inline image (Base64 encoded URL). For more detail,
see [`sizeLimit` option](#sizelimit).


## Options
### `sizeLimit`
Type: `Number` Default: `undefined`

A number specifying the maximum size of an image file in bytes.

If the image is greater than the limit or `sizeLimit` option is specified `undefined`, `path` is actual URL. In that case,
[file-loader](https://github.com/webpack-contrib/file-loader) is used by default and all query parameters are passed to it.
Using an alternative to file-loader is enabled via the `fallback` option.

If the image is smaller than the limit, `path` is Base64 encoded URL.

```js
// webpack.config.js
{
  loader: "react-image-element-loader",
  options: {
    sizeLimit: 10240,
  },
}
```

The limit can be specified via loader options and defaults to no limit.

### `jsx`
Type: `Boolean` Default: `false`

Specifies to enable output JSX codes instead of `React.createElement` function.

```js
// webpack.config.js
{
  loader: "react-image-element-loader",
  options: {
    jsx: true,
  },
}
```

### `fallback`
Type: `String` Default: `file-loader`

Specifies an alternative loader to use when a target image file's size exceeds [`sizeLimit`](#sizelimit) option.

```js
// webpack.config.js
{
  loader: "react-image-element-loader",
  options: {
    fallback: "responsive-loader",
  },
}
```

The fallback loader will receive the same configuration options as url-loader.

For example, to set the quality option of a responsive-loader above use:

```js
{
  loader: "react-image-element-loader",
  options: {
    fallback: {
      loader: "responsive-loader",
      options: {
        quality: 85,
      },
    },
  },
}
```


## Recipes
### Styling SVG
Imported SVG is React element, so you can specify `width` , `height` , and `fill` attributes.

```jsx
import LogoImage from "./logo.svg";

export default () => (
  <div>
    <LogoImage fill="#f00" />
  </div>
);
```

If you want to control colors using `fill` attribute, the SVG should not include child elements have `fill` .

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="62" height="58">
  <path fill="#000" d="M31 3.708L4.093 23.258l10.277 31.63h33.26l10.277-31.63L31 3.707z"/>
</svg>
```

### Specifies SVG as `background-image` in styles
If you want to specify SVG as `background-image` in styles, you should use `path` instead of React SVG element.

```jsx
import styled from "styled-components";
import { path as logoImagePath } from "./logo.svg";

const SVGBackgroundElement = styled.div`
  width: 128px;
  height: 128px;
  background-image: url("${logoImagePath}");
`;

export default () => (
  <div>
    <SVGBackgroundElement />
  </div>
);
```

### Enables type definitions for `import` syntax for TypeScript
If you want to enable type definitions for TypeScript, you should add `"react-image-element-loader"` to your `tsconfig.json`
file.

```json
{
  "compilerOptions": {
    "types": [
      "react-image-element-loader"
    ]
  }
}
```


## Contributing to react-image-element-loader
Bug reports and pull requests are welcome on GitHub at
[https://github.com/jagaapple/react-image-element-loader](https://github.com/jagaapple/react-image-element-loader). This project
is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

Please read [Contributing Guidelines](./.github/CONTRIBUTING.md) before development and contributing.


## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2018 Jaga Apple. All rights reserved.
