const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const sass = require('./tasks/sass');
const convertTS = require('./tasks/convertTS');
const uglifyJS = require('./tasks/uglifyJS');

const tasks = merge([{

    entry: {
        'app': ['./src/app.ts', './src/app.scss']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: '[name].js'
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ["*", ".js", '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin('build', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: 'Project',
            template: './src/index.html'
        })
    ]
}]);


module.exports = function() {
    return merge([
        tasks,
        sass(),
        convertTS(),
        uglifyJS()
    ]);
}