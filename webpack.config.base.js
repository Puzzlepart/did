/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
require('dotenv').config()
const path = require('path')

let config = {
  entry: path.resolve(__dirname, 'client/index.tsx'),
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
              configFile: path.resolve(__dirname, 'tsconfig-client.json')
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
    alias: {
      common: path.resolve(__dirname, 'client/common'),
      types: path.resolve(__dirname, 'client/types'),
      utils: path.resolve(__dirname, 'client/utils'),
      helpers: path.resolve(__dirname, 'client/helpers'),
      pages: path.resolve(__dirname, 'client/pages'),
      components: path.resolve(__dirname, 'client/components'),
      i18n: path.resolve(__dirname, 'client/i18n'),
      config: path.resolve(__dirname, 'client/config'),
      AppContext: path.resolve(__dirname, 'client/AppContext'),
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.gql'],
  }
}

module.exports = config
