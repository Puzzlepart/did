const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const archiver = require('archiver')
const package = require('../package.json')
const log = console.log

/**
 * Archives the package by creating a zip file containing package.json, node_modules, server and shared directories.
 * 
 * @param includeNodeModules - Whether or not to include node_modules directory in the archive (default: true).
 * 
 * @returns - A Promise that resolves when the archive has been created.
 */
async function run(includeNodeModules = true) {
    const filename = `./${package.name}-package.zip`
    log(chalk.cyan(`Creating archive ${filename}`))
    const output = fs.createWriteStream(filename)
    const archive = archiver('zip', {
        zlib: { level: 9 }
    })

    output.on('close', () => {
        const mb = archive.pointer() / 1024 / 1024
        log(`Archive ${filename} has been finalized and the output file is ready with ${mb.toFixed(2)} MB`)
    })

    output.on('end', () => {
        log(`Failed to archive ${filename}: data has been drained.`)
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

    log('Archiving package.json and package-lock.json...')
    archive.file('package.json')
    archive.file('package-lock.json')

    if (includeNodeModules) {
        log('Archiving node_modules...')
        archive.directory(path.resolve(__dirname, '../node_modules'), 'node_modules')
    } else {
        log('Skipping node_modules...')
    }

    log('Archiving dist/server...')
    archive.directory(path.resolve(__dirname, '../dist/server'), 'server')

    log('Archiving dist/shared...')
    archive.directory(path.resolve(__dirname, '../dist/shared'), 'shared')

    archive.pipe(output)

    await archive.finalize()
}

module.exports = run