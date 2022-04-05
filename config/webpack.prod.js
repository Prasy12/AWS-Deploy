const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	performance: {
		hints: false
	},
	entry: {
		Bundle: path.resolve(__dirname, '..', './src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '..', 'build'),
		filename: '[name].[chunkhash].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							compact: false,
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: { name: '[name].[ext]' }
					}
				]
			},
			{
				test: /\.(config|json|ttf)$/,
				use: [
					{
						loader: 'file-loader',
						options: { name: '[name].[ext]' }
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'public/index.html')
		}),
		new Dotenv({
			path: path.resolve(__dirname, '..', '.env.production')
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.[contenthash].css',
			chunkFilename: '[id].css'
		})
	]
};
