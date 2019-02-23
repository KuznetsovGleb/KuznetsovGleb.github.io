// Core
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// CONSTANTS
const { PROJECT_ROOT, SOURCE, BUILD, STATIC } = require('../constants');

/**
 * object
 * function
 * promise
 */
let pathsToClean = [
    'dist',
    'build'
]

// the clean options to use
let cleanOptions = {
    root: PROJECT_ROOT,
    // exclude: ['shared.js'],
    verbose: true,
    // dry: false
}

module.exports = () => {
    return {
        mode: 'none',
        devtool: false,
        entry: [SOURCE, 'webpack-hot-middleware/client?reload=true&quiet=true'],
        output: {
            path: BUILD,
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${STATIC}/template.html`,
                title: 'Учим вебпак! 💪🏼🌟🔫',
            }),
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
            new HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
        ],
    };
};