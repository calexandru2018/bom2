const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js',
        dashboard: './src/js/dashboard.js',
        login: './src/js/login.js'
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
        // hot: false,
    },    
    // devtool: 'source-map',
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
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img/'
                      }
                  }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                      }
                  }
                ]
            },
        ],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Home Page',
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            cache: true,
            excludeChunks: ['dashboard', 'login']
        }),
        new HtmlWebpackPlugin({
            title: 'Dashboard',
            filename: 'dashboard.html',
            template: './src/dashboard.html',
            hash: true,
            cache: true,
            excludeChunks: ['index', 'login']
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            filename: 'login.html',
            template: './src/login.html',
            hash: true,
            cache: true,
            excludeChunks: ['index', 'alternate', 'dashboard']
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
    ],
}