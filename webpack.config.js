const path = require('path');
const webpack = require('webpack');

const fs = require('fs');

function root(__path) {
    return path.join(__dirname, __path);
}

const config = {
    cache: true,
    entry: ['./src/index.js', 'webpack-hot-middleware/client?reload=true'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/temp/' // for webpack-dev-server output
    },
    module: {
        rules: [{ test: /\.(js|es6|jsx)$/, use: 'babel-loader', exclude: /node_modules/, }, {
            test: /\.(hbs)$/,
            use: 'handlebars-loader'
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'less-loader',
            ]
        }, { test: /\.(ts)$/, use: 'ts-loader', exclude: /node_modules/ },
        {
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader', options: {
                    modules: true,
                     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
