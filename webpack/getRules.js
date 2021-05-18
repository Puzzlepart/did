/**
 * Get rules config for webpack
 * 
 * @param configFile - TS config file
 * @param isDevelopment - Is development
 *
 * @returns rules config for webpack
 */
function getRules(configFile, isDevelopment) {
  return [
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
            configFile,
            transpileOnly: isDevelopment
          }
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
  ]
}

exports.getRules = getRules
