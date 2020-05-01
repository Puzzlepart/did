const webpackConfig = require('../../../webpack.config.js');
const webpack = require('webpack');



export default (app) => {
    try {
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const compiler = webpack(webpackConfig);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.path,
            writeToDisk: true,
        }));
        app.use(webpackHotMiddleware(compiler));
    } catch (error) {}
}