const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

function root(__path) {
    return path.join(__dirname, __path);
}
const config = {
    entry: {polyfills:['babel-polyfill'],vendor:['./vendor']},
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: root('dist/dll'),
        filename: '[name].[hash].js',
        sourceMapFilename: '[name].[hash].map',
        library: "__[name]"
    },
    module: {
    },
    devtool: 'source-map',
    // performance:{
    //     maxAssetSize: 100,
    //     maxEntrypointSize: 300,
    //     hints: 'warning',
    // },
    plugins: [new webpack.DllPlugin({
        name: '__[name]',
        path: root('dist/dll/[name]-manifest.json')
    }), new webpack.ProgressPlugin({}),
    ],
    node: {
        global: true,
        process: true,
        Buffer: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
        clearTimeout: true,
        setTimeout: true
    }
};

module.exports = config;
