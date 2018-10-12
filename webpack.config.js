const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // mode: 'development',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'assets/js/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        contentBase: './dist',
        hot: false,
    },    
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use:  ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Home Page',
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            cache: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
    ],
}