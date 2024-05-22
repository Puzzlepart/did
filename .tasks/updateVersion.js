const argv = require('yargs').argv
const fs = require('fs')
const colors = require('colors/safe')
const exec = require('child_process').exec
const package = require('../package.json')
const { promisify } = require('util')
const { parse } = require('path')
const writeFileAsync = promisify(fs.writeFile)
const execAsync = promisify(exec)

class Version {
    constructor(versionString) {
        const [major, minor, patch] = versionString.split('-')[0].split('.')
        this.major = parseInt(major)
        this.minor = parseInt(minor)
        this.patch = parseInt(patch)
        this.build = this._parseBuild(versionString)
    }

    _parseBuild(versionString) {
        const build = versionString.split('-')[1]
        if (!build) return null
        const [type, number] = build.split('.')
        return {
            type,
            number: number !== undefined ? parseInt(number) : 0
        }
    }

    incrementMajor() {
        this.major += 1
        this.minor = 0
        this.patch = 0
        this.build = {}
        return this
    }

    incrementMinor() {
        this.minor += 1
        this.patch = 0
        this.build = {}
        return this
    }

    incrementPatch() {
        this.patch += 1
        this.build = {}
        return this
    }

    incrementAlpha() {
        this.build = {
            type: 'alpha',
            number: this.isAlpha ? this.build.number + 1 : 0
        }
        return this
    }

    incrementBeta() {
        this.build.type = 'beta'
        this.build.number = this.isBeta ? this.build.number + 1 : 0
        return this
    }

    get isAlpha() {
        return this.build.type === 'alpha'
    }

    get isBeta() {
        return this.build.type === 'beta'
    }

    toString() {
        return `${this.major}.${this.minor}.${this.patch}${this.build.type ? `-${this.build.type}.${this.build.number}` : ''}`
    }
}


const currentVersion = new Version(package.version)
let newVersion = new Version(package.version)

/**
 * Updates the version of the package based on the provided arguments.
 * 
 * @returns {Promise<void>}
 */
async function updateVersion({ major, minor, patch, alpha, beta }) {
    if (argv.major) {
        newVersion = newVersion.incrementMajor()
    } else if (argv.minor) {
        newVersion = newVersion.incrementMinor()
    } else if (argv.patch) {
        newVersion = newVersion.incrementPatch()
    }
    else if (argv.alpha) {
        newVersion = newVersion.incrementAlpha()
    } else if (argv.beta) {
        newVersion = newVersion.incrementBeta()
    }
    package.version = newVersion.toString()
    console.log(`Updating version from ${colors.cyan(currentVersion.toString())} to ${colors.magenta(package.version)} in package.json`)
    if (argv.dryRun) return
    await writeFileAsync('./package.json', JSON.stringify(package, null, 2))
    await execAsync('npm install')
    if (argv.push) {
        console.log(`Updated version from ${colors.cyan(currentVersion.toString())} to ${colors.magenta(package.version)}. ${colors.magenta('Committing')} and ${colors.magenta('pushing')} changes to the repository.`)
        await execAsync('git add --all')
        await execAsync(`git commit -m "Updated version to ${package.version} [skip-ci]"`)
        await execAsync('git push')
        await execAsync(`git tag -a v${package.version} -m "${package.version}"`)
        await execAsync('git push --tags');
        console.log(`Updated version from ${colors.cyan(currentVersion.toString())} to ${colors.magenta(package.version)}. New tag have been created and pushed to the repository.`)
    } else {
        console.log(`Updated version from ${colors.cyan(currentVersion.toString())} to ${colors.magenta(package.version)}. Remember to ${colors.magenta('commit')} and ${colors.magenta('push')} the changes.`)
    }
}

updateVersion(argv)

