var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './project/main.js',
    output: {path: __dirname, filename: 'bundle.js'},
    webpack: {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }
            ]
        },
        externals: {
            cheerio: 'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        },
        node: {
            fs: 'empty'
        }
    },
};