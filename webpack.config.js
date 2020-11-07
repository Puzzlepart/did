require('dotenv').config()
const tryRequire = require('try-require')
const path = require('path')
const src = path.resolve(__dirname, 'client/')
const pkg = require('./package.json')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const serverDist = mode === 'production' ? 'server-dist' : 'server'
const filename = '[name].[hash].js'
const hbsTemplate = path.resolve(__dirname, 'server/views/index_template.hbs')

console.log('-----------------------------------')
console.log('---------Compiling Did bundle------')
console.log('-----------------------------------')
console.log('MODE: %s', mode)
console.log('SERVER DIST: %s', serverDist)
console.log('FILENAME: %s', filename)
console.log('HBS TEMPLATE: %s', hbsTemplate)
console.log('-----------------------------------')

let config = {
  mode,
  entry: { [pkg.name]: './client' },
  output: {
    path: path.resolve(__dirname, serverDist, 'public/js'),
    filename,
    publicPath: '/js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(src, 'common'),
      types: path.resolve(src, 'types'),
      utils: path.resolve(src, 'utils'),
      helpers: path.resolve(src, 'helpers'),
      pages: path.resolve(src, 'pages'),
      components: path.resolve(src, 'components'),
      i18n: path.resolve(src, 'i18n'),
      config: path.resolve(src, 'config'),
      AppContext: path.resolve(src, 'AppContext'),
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    plugins: [new TsconfigPathsPlugin({ configFile: './client/tsconfig.json' })]
  },
  plugins: [
    new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
    new HtmlWebpackPlugin({
      template: hbsTemplate,
      filename: path.resolve(__dirname, serverDist, 'views/index.hbs'),
      inject: true,
    }),
  ],
}

switch (mode) {
  case 'development':
    {
      config.stats = 'normal'
      config.watch = true
      config.watchOptions = { aggregateTimeout: 200 }
      config.plugins.push(new LiveReloadPlugin())
      config.plugins.push(
        new WebpackBuildNotifierPlugin({
          logo: path.join(__dirname, '/server/public/images/favicon/mstile-150x150.png'),
          sound: process.env.WEBPACK_NOTIFICATIONS_SOUND,
          suppressSuccess: process.env.WEBPACK_NOTIFICATIONS_SUPPRESSSUCCESS === 'true',
          showDuration: process.env.WEBPACK_NOTIFICATIONS_SHOWDURATION === 'true',
        })
      )
    }
    break
  case 'production':
    {
      config.stats = 'errors-only'
      config.plugins.push(new CompressionPlugin())
    }
    break
}

module.exports = config
