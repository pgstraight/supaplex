const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: { main: './src/app.js' },
	output: {
		path: path.resolve(__dirname, './www'),
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(png|jpg)$/,
				use: ['url-loader']
			},
			{
				test: /\.scss$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'app.css'
		})
	]
}
