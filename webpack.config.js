const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // Your existing configuration
  plugins: [
    new NodePolyfillPlugin()
  ]
};
