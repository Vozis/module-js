import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const __dirname = resolve();

const plugins = () => {
  const list =[
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename:'[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
    })
  ]
  return list
}

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
  entry: './main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'main.[contenthash].js',
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
  },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
  ]
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
}

export default config;