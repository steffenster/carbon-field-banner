/**
 * External dependencies.
 */
const path = require('path');
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Indicates if we're running the build process in production mode.
 *
 * @type {Boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: 'development',
	entry: {
		bundle: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: isProduction ? '[name].min.js' : '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
					},
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: path.resolve(__dirname, './assets/styles/*.scss')
						}
					}
				]
			}
		]
	},
	externals: {
		'@carbon-fields/core': 'cf.core',
		'refract-callbag': [ 'cf', 'vendor', 'refract-callbag' ],
		'callbag-basics': [ 'cf', 'vendor', 'callbag-basics' ],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: isProduction ? '[name].min.css' : '[name].css'
		}),

		...(
			isProduction
				? [
					new DependencyExtractionWebpackPlugin(),
					new CssMinimizerPlugin(),
					new TerserPlugin()
				]
				: []
		)
	],
	stats: {
		modules: false,
		hash: false,
		builtAt: false,
		children: false
	}
};
