const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './task03/js/main.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader?name=assets/[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './task03/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ]
}