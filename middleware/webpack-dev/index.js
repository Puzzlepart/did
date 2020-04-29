const webpackConfig = require('../../webpack.config.js');
const webpack = require('webpack')(webpackConfig);

function webpackDevMiddleware(app) {
    app.use(require("webpack-dev-middleware")(webpack, { noInfo: true, publicPath: webpackConfig.output.path }));
    app.use(require("webpack-hot-middleware")(webpack));
}

module.exports = webpackDevMiddleware