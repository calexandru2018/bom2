const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        contact: './src/contact.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Main Page',
            filename: 'index.html',
            hash: true,
            excludeChunks: ['contact'],
        }),
        new HtmlWebpackPlugin({
            title: 'Contact',
            filename: 'contact.html',
            template: './src/contact.html',
            hash: true,
            chunks: ['contact'],
        }),
    ],
    devServer: {
        contentBase: './dist' 
    },    
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'assets/js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}