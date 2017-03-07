const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
function root(__path) {
    return path.join(__dirname, __path);
}
const config = {
    cache: true,
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/temp/' // for webpack-dev-server output
    },
    module: {
        rules: [{test: /\.(js|es6)$/, use: 'babel-loader'}, {test: /\.(hbs)$/, use: 'handlebars-loader'}, {
            test: /\.less$/,
            use: [
                'style-loader',
                {loader: 'css-loader', options: {importLoaders: 1}},
                'less-loader'
            ]
        }]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-map',
    // performance:{
    //     maxAssetSize: 100,
    //     maxEntrypointSize: 300,
    //     hints: 'warning',
    // },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        })
    ]
};

module.exports = config;
