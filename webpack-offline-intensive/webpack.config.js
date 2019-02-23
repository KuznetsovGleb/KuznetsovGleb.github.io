// Core
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

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
    // root: './build/',
    // exclude: ['shared.js'],
    // verbose: true,
    // dry: false
}

module.exports = () => {
    return {
        mode: 'none',
        devtool: false,
        output: {
            path: resolve(__dirname, './build'),
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './static/template.html',
                title: 'Учим вебпак! 💪🏼🌟🔫',
            }),
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
        ],
    };
};