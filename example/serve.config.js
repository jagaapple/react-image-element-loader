// =============================================================================================================================
// EXAMPLE - SERVE CONFIG
// =============================================================================================================================
const path = require("path");
const serve = require("webpack-serve");
const config = require("./webpack.config");

serve({}, { config, content: path.join(__dirname, "dist"), open: true, port: 5000 });
