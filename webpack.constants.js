/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')
const __package = require('./package.json')

/** CONSTANTS */
const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const IS_DEVELOPMENT = MODE === 'development'
const SERVER_DIST = IS_DEVELOPMENT ? 'server' : 'dist/server'
const PUBLIC_JS_PATH =path.resolve(__dirname, SERVER_DIST, 'public/js')
const BUNDLE_FILE_NAME = `${__package.name}.${__package.version}.[contenthash].js`
const HTML_PLUGIN_TEMPLATE = path.resolve(__dirname, 'server/views/_template.hbs')
const HTML_PLUGIN_FILE_NAME = path.resolve(__dirname, SERVER_DIST, 'views/index.hbs')
const SRC_PATH = path.resolve(__dirname, 'client/')
const DEFINITIONS = {
    'process.env.VERSION': JSON.stringify(__package.version),
    'process.env.LOG_LEVEL': JSON.stringify(process.env.CLIENT_LOG_LEVEL || 'SILENT')
}
module.exports = {
    MODE,
    IS_DEVELOPMENT,
    SERVER_DIST,
    PUBLIC_JS_PATH,
    BUNDLE_FILE_NAME,
    HTML_PLUGIN_TEMPLATE,
    HTML_PLUGIN_FILE_NAME,
    SRC_PATH,
    DEFINITIONS
}