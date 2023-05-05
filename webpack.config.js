const path = require("path")

// // плагины
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const filename = ext =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
  const configObf = {
    splitChunks: {
      chunks: "all",
    },
  }
  if (isProd) {
    configObf.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]
  }

  return configObf
}

const plugins = () => {
  const basePlugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      title: "js-advanced-diplom.",
      scriptLoading: "module",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
      },
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: "./assets/images/favicon.svg",
      cache: true,
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: `./styles/${filename("css")}`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
  ]

  return basePlugins
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./scripts/index.js",
  output: {
    filename: `./scripts/${filename("js")}`,
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: `./assets/${filename("[ext]")}`,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/i,
        type: "asset/source",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: plugins(),
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8000,
  },
  devtool: isProd ? false : "source-map",

  optimization: optimization(),
}
