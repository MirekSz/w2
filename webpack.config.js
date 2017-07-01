const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
function root(__path) {
    return path.join(__dirname, __path);
}
const config = {
    cache: true,
    entry: ['babel-polyfill', './src/index.js', 'webpack-hot-middleware/client?reload=true'],
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
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
//    devServer: {
//        contentBase: path.join(__dirname, "dev"),
//        compress: true,
//        port: 9000,
//        setup: function (app) {
//
//            app.get('/dll/*', function (req, res) {
//                console.log('asdasd')
//                var files = req.path.split('/');
//                var chunk = files[files.length - 1].replace('.js', '');
//                if (chunk.split('.').length < 2) {
//                    res.sendFile(root('dist/dll/' + getDllAssets(chunk)));
//                } else {
//                    res.sendFile(root('dist/dll/' + chunk + '.js'));
//                }
//            });
//        },
//    },
    // performance:{
    //     maxAssetSize: 100,
    //     maxEntrypointSize: 300,
    //     hints: 'warning',
    // },
    plugins: [
        //     new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity,
        //     filename: 'vendor.bundle.js'
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // })
    ]
};

module.exports = config;
