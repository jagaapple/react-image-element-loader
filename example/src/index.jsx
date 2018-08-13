// =============================================================================================================================
// EXAMPLE - INDEX
// =============================================================================================================================
import React from "react";
import ReactDOM from "react-dom"
import ImageElement, { path as imagePath } from "./star.png";

ReactDOM.render(
  <main>
    <h1>Hello, world!</h1>
    <img src={imagePath} />
    <ImageElement width="50" />
  </main>,
  document.getElementById("app"),
);
