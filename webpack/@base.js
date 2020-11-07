/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
require('dotenv').config()
const { resolve } = require('path')

let config = {
  entry: resolve(__dirname, '../client/index.tsx'),
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
            options: {
              configFile: resolve(__dirname, '../client/tsconfig.json')
            },
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
    alias:
      [
        'AppContext',
        'common',
        'components',
        'config',
        'graphql',
        'helpers',
        'pages',
        'types',
        'utils',
      ].reduce((alias, a) => ({ ...alias, [a]: resolve(__dirname, `../client/${a}`) }), {}),
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.gql'],
  }
}

module.exports = config
