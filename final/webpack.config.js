import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = resolve();

const plugins = () => {
  const list = [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
  ];
  return list;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const config = {
  entry: "./main.js",
  output: {
    path: resolve(__dirname, "build"),
    filename: "main.[contenthash].js",
    clean: true,
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "img-optimize-loader",
            options: {
              compress: {
                mode: "high",
                webp: true,
                gifsicle: true,
                disableOnDevelopment: false,
              },
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        type: "asset/resource",
        generator: {
          filename: "assets/audio/[name][ext][query]",
        },
      },
      {
        test: /\.mp4$/,
        type: "asset/resource",
        generator: {
          filename: "assets/video/[name][ext][query]",
        },
      },
    ],
  },
  devServer: {
    static: "./",
    open: {
      app: {
        name: "Google Chrome",
      },
    },
    compress: true,
    port: 3000,
  },
};

export default config;
