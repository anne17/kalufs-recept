const webpack = require("webpack")

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/recept/" : "/",
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /sv/)]
  },
  chainWebpack: config => {
    config.plugin("copy").tap(([options]) => {
      options[0].ignore.push("img_medium/**")
      options[0].ignore.push("img_thumb/**")
      return [options]
    })
  }
}
