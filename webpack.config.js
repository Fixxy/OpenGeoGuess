const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.svg$/,
			use: [{
				loader: 'svg-url-loader',
				options: {
					limit: 10000
				}
			}]
		}, {
			test: /\.(png|jpe?g|gif)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					esModule: false,
				},
			}],
		}]
	},
	resolve: {
		alias: {
			"./images/layers.png$": path.resolve(
				__dirname,
				"./node_modules/leaflet/dist/images/layers.png"
			),
			"./images/layers-2x.png$": path.resolve(
				__dirname,
				"./node_modules/leaflet/dist/images/layers-2x.png"
			),
			"./images/marker-icon.png$": path.resolve(
				__dirname,
				"./node_modules/leaflet/dist/images/marker-icon.png"
			),
			"./images/marker-icon-2x.png$": path.resolve(
				__dirname,
				"./node_modules/leaflet/dist/images/marker-icon-2x.png"
			),
			"./images/marker-shadow.png$": path.resolve(
				__dirname,
				"./node_modules/leaflet/dist/images/marker-shadow.png"
			)
		}
	}
}