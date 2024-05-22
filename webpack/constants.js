/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')
const package = require('../package.json')
const SRC_PATH = path.resolve('./client')
const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const IS_DEVELOPMENT = MODE === 'development'
const SERVER_DIST = IS_DEVELOPMENT ? './server' : './app/server'
const PUBLIC_JS_PATH = path.resolve(SERVER_DIST, 'public/js')
const HTML_PLUGIN_TEMPLATE = path.resolve('./server/views/_template.hbs')
const HTML_PLUGIN_FILE_NAME = path.resolve(SERVER_DIST, 'views/index.hbs')
const TSCONFIG_PATH = path.resolve(SRC_PATH, 'tsconfig.json')
const EXPORTED_ENV_VARS = {
    'VERSION': JSON.stringify(package.version),
    'DISPLAY_VERSION_DETAILS': JSON.stringify(process.env.DISPLAY_VERSION_DETAILS ?? '0'),
    'process.env.LOG_LEVEL': JSON.stringify(process.env.CLIENT_LOG_LEVEL ?? 'SILENT'),
}

module.exports = new Map([
    ['MODE', MODE],
    ['IS_DEVELOPMENT', IS_DEVELOPMENT],
    ['SERVER_DIST', SERVER_DIST],
    ['PUBLIC_JS_PATH', PUBLIC_JS_PATH],
    ['HTML_PLUGIN_TEMPLATE', HTML_PLUGIN_TEMPLATE],
    ['HTML_PLUGIN_FILE_NAME', HTML_PLUGIN_FILE_NAME],
    ['SRC_PATH', SRC_PATH],
    ['TSCONFIG_PATH', TSCONFIG_PATH],
    ['TSCONFIG_COMPILER_OPTIONS', require(TSCONFIG_PATH).compilerOptions],
    ['EXPORTED_ENV_VARS', EXPORTED_ENV_VARS],
    ['REPOSITORY_URL', package.repository.url],
    ['BUNDLE_FILE_NAME', package.config.BUNDLE_FILE_NAME],
])