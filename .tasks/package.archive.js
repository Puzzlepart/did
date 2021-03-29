/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/no-array-for-each */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const archiver = require('archiver')
const package = require('../package.json')
const log = console.log

async function run() {
    const filename = `./${package.name}-package.zip`
    log(chalk.cyan(`Creating archive ${filename}`))
    const output = fs.createWriteStream(filename)
    const archive = archiver('zip', {
        zlib: { level: 9 }
    })

    output.on('close', () => {
        log(`Archive ${filename} has been finalized and the output file is ready with ${archive.pointer()} total bytes.`)
    })

    output.on('end', () => {
        log(`Failed to archive ${filename}: Data has been drained`)
    })

    archive.on('warning', (error) => {
        if (err.code === 'ENOENT') {
            log(error)
        } else {
            log(error)
            throw error
        }
    })

    archive.on('error', (error) => {
        log(error)
        throw error
    })

    log('Archiving package.json...')
    archive.file('package.json')

    log('Archiving node_modules...')
    archive.directory(path.resolve(__dirname, '../node_modules'), 'node_modules')
    // const dependencies = Object.keys(package.dependencies)
    // dependencies.forEach((dep, idx) => {
    //     log(`\t(${idx + 1} of ${dependencies.length}) Archiving dependency ${dep}`)
    //     archive.directory(path.resolve(__dirname, `../node_modules/${dep}`), `node_modules/${dep}`)
    // })
    log('Archiving dist/server...')
    archive.directory(path.resolve(__dirname, '../dist/server'), 'server')
    log('Archiving dist/shared...')
    archive.directory(path.resolve(__dirname, '../dist/shared'), 'shared')

    log('Piping output...')
    archive.pipe(output)

    log('Finalizing...')
    await archive.finalize()
}

module.exports = run