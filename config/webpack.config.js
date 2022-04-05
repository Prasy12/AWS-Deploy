const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

console.log(__dirname, '__dirname');
module.exports = {
	mode: 'development',
	performance: {
		hints: false
	},
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		compress: true
	},
	entry: {
		Bundle: path.resolve(__dirname, '..', './src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
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
							sourceType: 'unambiguous',
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{
										regenerator: true
									}
								],
								'@babel/plugin-proposal-class-properties'
							]
						}
					}
				]
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/,
				exclude: path.resolve(__dirname, 'node_modules')
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
			path: path.resolve(__dirname, '..', '.env.local')
		})
	]
};
