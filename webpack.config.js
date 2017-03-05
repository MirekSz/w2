const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
function root(__path ) {
    return path.join(__dirname, __path);
}
function getManifest(__path) {
    var __fs = fs || require('fs');
    var manifest = tryDll(() => JSON.parse(__fs.readFileSync(root('./dist/dll/' + __path + '-manifest.json'), 'utf8')
    // TODO(gdi2290): workaround until webpack fixes dll generation
        .replace(/}(.*[\n\r]\s*)}(.*[\n\r]\s*)}"activeExports": \[\]/, '')));
    return manifest;
}
function getDllAssets(chunk) {
    var assets =  tryDll(() => require(root('./dist/webpack-assets.json')));
    // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
    return assets[chunk]['js'];
}
function getAssets(chunk) {
    var assets =  tryDll(() => require(root('./dist/dll/webpack-assets.json')));
    // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
    return assets[chunk]['js'];
}
function tryDll(cb) {
    try {
        return cb();
    } catch (e) {
        console.info("Initializing `%s`...", "DLL files",e);
        var spawn = require('cross-spawn');
        spawn.sync("npm", ["run", "dll"], {stdio: "inherit"});
        return cb();
        // throw new Error('Please run `npm run dll` first before building or running the server');
    }
}
const config = {
    cache: true,
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'temp/' // for webpack-dev-server output
    },
    module: {
        rules: [{test: /\.(js|es6)$/, use: 'babel-loader'}, {test: /\.(hbs)$/, use: 'handlebars-loader'}]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 9000,
        setup: function(app) {

            app.get('/dll/*', function(req, res) {
                console.log('asdasd')
                var files = req.path.split('/');
                var chunk = files[files.length - 1].replace('.js', '');
                if (chunk.split('.').length < 2) {
                    res.sendFile(root('dist/dll/' + getDllAssets(chunk)));
                } else {
                    res.sendFile(root('dist/dll/' + chunk+'.js'));
                }
            });
        },
    },
    // performance:{
    //     maxAssetSize: 100,
    //     maxEntrypointSize: 300,
    //     hints: 'warning',
    // },
    plugins:[
        new webpack.DllReferencePlugin({
            scope: "alpha",
            context: path.join(__dirname, "dist", "dll"),
        manifest:  require('./dist/dll/polyfills-manifest.json'),
    }),
        new webpack.DllReferencePlugin({
            scope: "beta",
            context: path.join(__dirname, "dist", "dll"),
            manifest:  require('./dist/dll/vendor-manifest.json'),
        }),
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
