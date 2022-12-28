import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';


const __dirname = resolve();

const plugins = () => {
  const list =[
    new BundleAnalyzerPlugin(),
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
    clean: true,
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
      { test: /\.mp3$/,
      type: 'asset/resource',}
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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