const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
		filename: '[name].[hash].js',          //http://www.jb51.net/article/139341.htm
		chunkFilename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath:'/'
	},
	devServer: {
	  historyApiFallback:true,
	  proxy:{
	  	//凡是`/api`开头的http请求，都会被代理到localhost:3000,由 koa 提供 mock 数据
	  	// koa 代码在 ./mock 目录中，启动命令为 npm run mock
	  	'/api':{
	  		target:'http://localhost:3000',
	  		secure:false
	  	}
	  },
	  contentBase: path.join(__dirname, "dist/index.html"),
	  compress: true,
	  port: 8080
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
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
		// new UglifyJSPlugin(),
		new HtmlWebpackPlugin({
			title:'Webpack4-react16',
			template:'./app/util/index.tmpl.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtraPlugin({
			filename:"style.[hash].css",
			chunkFilename:"style.[hash].css"
		}),
		 new OptimizeCSSAssetsPlugin({})
	],
	mode: 'development',

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
		            name: "vendors",
		            priority:10,
		            chunks: "all"    
		        }
			}
		}
	}
};

// https://www.ctolib.com/topics-131382.html
// 使用模块分离css后修改样式表似乎无法热加载