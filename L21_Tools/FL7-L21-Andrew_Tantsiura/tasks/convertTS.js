const webpack = require('webpack');
module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    }
                }
            }, {
                test: /\.ts$/,
                loader: 'ts-loader'
            }]
        }
    };
};