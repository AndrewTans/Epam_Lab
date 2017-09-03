const ExtractTextPlugin = require('extract-text-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'sass-loader'],
                    publicPath: '/build'
                })
            }],
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'app.css',
                disable: false,
                allChunks: true
            }),
            new styleLintPlugin({
                configFile: '.stylelintrc',
                context: 'src',
                files: '/*.css',
                failOnError: false,
                quiet: false
            })
        ],
    };
};