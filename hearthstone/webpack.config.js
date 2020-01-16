const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    watch: true,
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),

    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] },
        { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"] },
        { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["file-loader"] },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './dist/index.html',
          filename: './index.html',
        })
      ]
}