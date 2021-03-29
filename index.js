/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/no-array-for-each */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')
const archiver = require('archiver')
const package = require('./package.json')
const promisifyasync = promisify(fs.readdir)
const log = console.log

async function run() {
    const a = await promisifyasync('./node_modules')
    console.log(a)
}

run()