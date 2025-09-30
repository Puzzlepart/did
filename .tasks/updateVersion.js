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
    if (argv.major || argv.minor || argv.patch) {
        const base = currentVersion.split('-')[0]
        const [maj, min, pat] = base.split('.').map(v => parseInt(v, 10))
        let nextMajor = maj
        let nextMinor = min
        let nextPatch = pat

        if (argv.major) {
            nextMajor = maj + 1
            nextMinor = 0
            nextPatch = 0
        } else if (argv.minor) {
            nextMinor = min + 1
            nextPatch = 0
        } else if (argv.patch) {
            nextPatch = pat + 1
        }

        newVersion = `${nextMajor}.${nextMinor}.${nextPatch}`
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
    console.log(`Updating version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)} in package.json`)
    await writeFileAsync('./package.json', JSON.stringify(package, null, 2))
    await execAsync('npm install')
    if (argv.push) {
        console.log(`Updated version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)}. ${colors.magenta('Committing')} and ${colors.magenta('pushing')} changes to the repository.`)
        await execAsync('git add --all')
        await execAsync(`git commit -m "Updated version to ${newVersion} [skip-ci]"`)
        await execAsync('git push')
        await execAsync(`git tag -a v${newVersion} -m "${newVersion}"`)
        await execAsync('git push --tags');
        console.log(`Updated version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)}. New tag have been created and pushed to the repository.`)
    } else {
        console.log(`Updated version from ${colors.cyan(currentVersion)} to ${colors.magenta(newVersion)}. Remember to ${colors.magenta('commit')} and ${colors.magenta('push')} the changes.`)
    }
}

updateVersion(argv)

