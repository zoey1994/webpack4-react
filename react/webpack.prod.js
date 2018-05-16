const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const CleanWebpack = require('clean-webpack-plugin');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */






/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

module.exports = {
  entry: './app/util/index.js',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'

      }, 
      {
        test: /\.(css|scss)$/,
        exclude:/node_modules/,
        use: [
          MiniCssExtraPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test:/\.(eot|svg|ttf|woff|woff2)$/,
        loader:"url-loader",
        options:{
          limit:'450000',
          outputPath:'fonts/'
        }
      },
      {
        test:/\.(jpg|png|gif|jpeg|bmp)$/,
        loader:"url-loader",
        options:{
          limit:'90000',
          outputPath:'images/'
        }
      }    
    ]
  },
  plugins: [
   new CleanWebpack(['dist']),
    new HtmlWebpackPlugin({
      title:'Webpack4-react16',
      template:'./app/util/index.tmpl.html'
    }),
    new MiniCssExtraPlugin({
      filename:"style.[hash].css",
      chunkFilename:"style.[hash].css"
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  mode: 'production',

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,

      cacheGroups: {
        commons:{
          name:"commons",
          chunks:"all",
          enforce:true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          chunks: "all" 
        }
      }
    }
  }
}