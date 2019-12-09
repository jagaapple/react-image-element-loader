<h1 align="center">react-image-element-loader</h1>

<h4 align="center">🖼️ The webpack loader to import React element and file path from images. 📦</h4>

```jsx
import { element as LogoSVG } from "./logo.svg";
import photoImagePath from "./photo.jpg";

export default () => (
  <div>
    <LogoSVG width="230" height="140" fill="black" />
    <img src={photoImagePath} alt="flower" />
  </div>
);
```

<div align="center">
<a href="https://www.npmjs.com/package/react-image-element-loader"><img src="https://img.shields.io/npm/v/react-image-element-loader.svg" alt="npm"></a>
<a href="https://circleci.com/gh/jagaapple/react-image-element-loader"><img src="https://img.shields.io/circleci/project/github/jagaapple/react-image-element-loader/master.svg" alt="CircleCI"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/react-image-element-loader.svg" alt="license"></a>
<a href="https://twitter.com/jagaapple_tech"><img src="https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg" alt="@jagaapple_tech"></a>
</div>

## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
  - [Gets image path](#gets-image-path)
  - [Gets React element](#gets-react-element)
- [Options](#options)
  - [`sizeLimit`](#sizelimit)
  - [`jsx`](#jsx)
  - [`fallback`](#fallback)
- [Recipes](#recipes)
  - [Styling SVG](#styling-svg)
  - [Enables type definitions for TypeScript](#enables-type-definitions-for-typescript)
- [Contributing to react-image-element-loader](#contributing-to-react-image-element-loader)
- [License](#license)

<!-- /TOC -->


## Features
| FEATURES                      | WHAT YOU CAN DO                                              |
|-------------------------------|--------------------------------------------------------------|
| ⚛️ **Designed for JSX**        | Import images as React element like `<MySVG fill={color} />` |
| ✨ **Exported as plain image** | Import image paths or as inline image (Base64)               |
| 🎩 **Type Safe**              | You can use with TypeScript                                  |


## Quick Start
### Requirements
- npm or Yarn
- webpack 4.0.0 or higher

### Installation
```bash
$ npm install -D react-image-element-loader
```

If you are using Yarn, use the following command.

```bash
$ yarn add -D react-image-element-loader
```

### Setup
Firstly setup your webpack settings.

```js
// webpack.config.js
module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
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

Also you can pass a module to "loader" property instead.

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
### Gets image path
You can import image paths (URI).

```jsx
import logoImagePath from "./logo.svg";
// or: const logoImagePath = require("./logo.svg").default;
import photoImagePath from "./photo.jpg";

export default () => (
  <div>
    <img src={logoImagePath} alt="logo" />
    <img src={photoImagePath} alt="photo" />
  </div>
);
```

Generally, the path is an actual image URL (through [file-loader](https://github.com/webpack-contrib/file-loader)). When you
use `sizeLimit` option and the image is smaller than `sizeLimit` , the path will be converted to inline image (Base64 encoded URL).
For more detail, see [`sizeLimit` option](#sizelimit).

### Gets React element
You can import images as React elements like `<img />` . It's possible to pass props such as HTMLAttributes, but `src` will be ignored.

```jsx
import { element as LogoSVG } from "./logo.svg";
// or: const LogoSVG = require("./logo.svg").element;
import { element as PhotoImage } from "./photo.jpg";

export default () => (
  <div>
    <LogoSVG fill="black" />

    <PhotoImage />
    <PhotoImage width="100" alt="flower" />

    {/* overwriting `src` will be ignored. */}
    <PhotoImage src="other-image.jpg" />
  </div>
);
```

react-image-element-loader supports PNG (.png), JPEG (.jpg), GIF (.gif), and SVG (.svg).


## Options
### `sizeLimit`
Type: `Number` Default: `undefined`

A number specifying the maximum size of an image file in bytes.

If the image is greater than the limit or `sizeLimit` option specified `undefined`, `path` will be an actual URL. In that case,
[file-loader](https://github.com/webpack-contrib/file-loader) is used by default and all query parameters are passed to it.
Using an alternative to file-loader is enabled via the `fallback` option.

If the image is smaller than the limit, `path` will be a Base64 encoded URL.

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

Specifies to enable to output JSX codes instead of `React.createElement` function.

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
If you import SVG images as React element, you can specify `width` , `height` , and `fill` attributes. So you can give styles
for SVG using variables.

```jsx
import { element as LogoSVG } from "./logo.svg";

export default (props) => (
  <div>
    <LogoSVG fill={props.color} />
  </div>
);
```

In this case, the SVG should not include child elements have `fill` .

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="62" height="58">
  <path fill="#000" d="M31 3.708L4.093 23.258l10.277 31.63h33.26l10.277-31.63L31 3.707z"/>
</svg>
```

### Enables type definitions for TypeScript
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

Copyright 2019 Jaga Apple. All rights reserved.
