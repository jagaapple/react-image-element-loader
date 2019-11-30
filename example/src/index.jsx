import React from "react";
import ReactDOM from "react-dom"

import startImagePath, { element as StarImage } from "./star.png";
import polygonImagePath, { element as PolygonSVG } from "./polygon.svg";

ReactDOM.render(
  <main>
    <h1>Hello, world!</h1>
    <img src={startImagePath} width="256" />
    <StarImage width="256" />

    <hr />

    <img src={polygonImagePath} width="256" />
    <PolygonSVG fill="red" />
  </main>,
  document.getElementById("app"),
);
