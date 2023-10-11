const argv = require('yargs').argv
const fs = require('fs')
const colors = require('colors/safe')
const exec = require('child_process').exec
const package = require('../package.json')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const execAsync = promisify(exec)

const currentVersion = package.version
let newVersion = currentVersion

/**
 * Updates the version of the package based on the provided arguments.
 * 
 * @returns {Promise<void>}
 */
async function updateVersion({ major, minor, patch, alpha, beta }) {
    if (argv.major) {
        newVersion = currentVersion.split('.').map((v, i) => i === 0 ? parseInt(v) + 1 : 0).splice(0, 3).join('.')
    } else if (argv.minor) {
        newVersion = currentVersion.split('.').map((v, i) => i === 1 ? parseInt(v) + 1 : 0).splice(0, 3).join('.')
    } else if (argv.patch) {
        newVersion = currentVersion.split('.').map((v, i) => i === 2 ? parseInt(v) + 1 : 0).splice(0, 3).join('.')
    }
    else if (argv.alpha) {
        if (currentVersion.includes('-alpha')) {
            const alphaVersion = parseInt(currentVersion.split('-alpha.')[1])
            newVersion = currentVersion.split('-alpha.')[0] + '-alpha.' + (alphaVersion + 1)
        } else {
            newVersion = currentVersion + '-alpha.0'
        }
    } else if (argv.beta) {
        if (currentVersion.includes('-beta')) {
            const alphaVersion = parseInt(currentVersion.split('-beta.')[1])
            newVersion = currentVersion.split('-beta.')[0] + '-beta.' + (alphaVersion + 1)
        } else {
            newVersion = currentVersion + '-beta.0'
        }
    }

    package.version = newVersion
    await writeFileAsync('./package.json', JSON.stringify(package, null, 2))
    await execAsync('npm install')
    if (argv.push) {
        await execAsync(`git tag -a v${newVersion} -m "${newVersion}"`)
        await execAsync('git push --tags');
        console.log(`Updated version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)}. New tag have been created and pushed to the repository.`)
    } else {
        console.log(`Updated version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)}. Remember to ${colors.magenta('commit')} and ${colors.magenta('push')} the changes.`)
    }
}

updateVersion(argv)

