require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const src = path.resolve(__dirname, 'client/');
const package = require('./package.json');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode);
console.log("PACKAGE_VERSION: %s", package.version);

let config = {
  mode,
  entry: { [package.name]: './client' },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
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
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/, use: [
          { loader: "style-loader" },  // to inject the result into the DOM as a style block
          { loader: "css-modules-typescript-loader" },  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          { loader: "sass-loader" },  // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ]
      },
    ]
  },
  resolve: {
    alias: {
      interfaces: path.resolve(src, 'interfaces'),
      utils: path.resolve(src, 'utils'),
      helpers: path.resolve(src, 'helpers'),
      pages: path.resolve(src, 'pages'),
      common: path.resolve(src, 'common'),
      i18n: path.resolve(src, 'i18n'),
      AppContext: path.resolve(src, 'AppContext'),
    },
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY': JSON.stringify(process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY),
      },
    }),
    new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: 'detailed',
};

switch (mode) {
  case 'development': {
    config.stats = 'errors-only';
  }
    break;
  case 'production': {
    config.stats = {
      chunks: false,
      assets: false,
      colors: false,
      timings: true,
      errors: true,
      warnings: false,
      errorDetails: true,
      logging: 'error',
      loggingTrace: false,
      modules: false,
      performance: false
    }
  }
    break;
}

module.exports = config;
