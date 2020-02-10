const webpack = require("webpack")

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/recept/" : "/",
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /sv/)]
  }
}
