import React from "react";
import ReactDOM from "react-dom"

import ImageElement, { path as imagePath } from "./star.png";
import SvgElement, { path as svgPath } from "./polygon.svg";

ReactDOM.render(
  <main>
    <h1>Hello, world!</h1>
    <img src={imagePath} width="256" />
    <ImageElement width="256" />

    <hr />

    <img src={svgPath} width="256" />
    <SvgElement fill="red" />
  </main>,
  document.getElementById("app"),
);
