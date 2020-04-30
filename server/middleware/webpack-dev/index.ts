const webpackConfig = require('../../../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');



export default (app) => {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.path,
        writeToDisk: true,
    }));
    app.use(webpackHotMiddleware(compiler));
}