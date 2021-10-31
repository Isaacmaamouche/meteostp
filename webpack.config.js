const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    polyfill: "babel-polyfill",
    app: "./src/js/app.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "src/js/")
  },

  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
          presets: ["@babel/preset-env"]
          }
        }
      },
      // {
      //   test: /\.css$/i,
      //   exclude: /node_modules/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', 'postcss-preset-env', 'autoprefixer', 'cssnano'],
      // }
    ]
  }
};