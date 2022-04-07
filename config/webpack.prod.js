const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset'
			},
			// We recommend using only for the "production" mode
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: ImageMinimizerPlugin.loader,
						options: {
							minimizer: {
								implementation: ImageMinimizerPlugin.imageminMinify,
								options: {
									plugins: [
										'imagemin-gifsicle',
										'imagemin-mozjpeg',
										'imagemin-pngquant',
										'imagemin-svgo'
									]
								}
							}
						}
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
