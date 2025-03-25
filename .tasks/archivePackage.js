const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const archiver = require('archiver')
const package = require('../package.json')
const log = console.log

const DIST_DIR = path.resolve(__dirname, '../dist')
const SERVER_DIR = path.resolve(__dirname, '../server')
const NODE_MODULES_DIR = path.resolve(__dirname, '../node_modules')

/**
 * Archives the package by creating a zip file containing package.json, node_modules, server and shared directories.
 * 
 * @param includeNodeModules - Whether to include node_modules in the archive. Defaults to `false`.
 * @param includePackageLockFile - Whether to include package-lock.json in the archive. Defaults to `true`.
 * 
 * @returns - A Promise that resolves when the archive has been created.
 */
async function run({ includeNodeModules = false, includePackageLockFile = true }) {
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
        if (error.code === 'ENOENT') {
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
    if (includePackageLockFile) {
        archive.file('package-lock.json')
    } else {
        log('Skipping package-lock.json...')
    }


    log('Archiving deployment files...')
    archive.file('.deployment')
    archive.file('.deploy/deploy.sh')

    log('Archiving revision file...')
    archive.file('revision.txt')

    if (includeNodeModules) {
        log('Archiving node_modules...')
        archive.directory(NODE_MODULES_DIR, 'node_modules')
    } else {
        log('Skipping node_modules...')
    }

    log('Archiving server from dist...')
    archive.directory(path.resolve(DIST_DIR, 'server'), 'server')

    log('Archiving error pages...')
    archive.directory(path.resolve(SERVER_DIR, 'public/errors'), 'server/public/errors')

    log('Archiving public pages...')
    archive.directory(path.resolve(SERVER_DIR, 'public/pages'), 'server/public/pages')

    log('Archiving shared from dist...')
    archive.directory(path.resolve(DIST_DIR, 'shared'), 'shared')

    archive.pipe(output)

    await archive.finalize()
}

module.exports = run