var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 5001;

process.on('uncaughtException', function (exception) {
    console.log(exception)
    //ignore crash process
});

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    quiet: false,
    reload: true,
    stats: true,
    overlay: true,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
    },
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('/', (req, res) => {
    console.log('/')
    res.sendFile(path.join(__dirname, 'app/index.html'));
});
app.get('*', (req, res) => {
    console.log('*')
    res.sendFile(path.join(__dirname, req.originalUrl.split('?')[0]));
});


app.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});
