const argv = require('yargs').argv
const fs = require('fs')
const path = require('path')
const colors = require('colors/safe')
const exec = require('child_process').exec
const package = require('../package.json')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
const execAsync = promisify(exec)

const currentVersion = package.version
let newVersion = currentVersion

const CHANGELOG_DIR = path.resolve(__dirname, '../.changelog')
const CHANGELOG_INDEX = path.join(CHANGELOG_DIR, 'CHANGELOG.md')

/**
 * Creates a stub .changelog/<version>.md and prepends a load directive
 * to .changelog/CHANGELOG.md. Skips if the file already exists so reruns
 * don't overwrite filled-in release notes.
 *
 * @param {string} version
 * @returns {Promise<void>}
 */
async function createChangelogEntry(version) {
    const entryPath = path.join(CHANGELOG_DIR, `${version}.md`)
    if (fs.existsSync(entryPath)) {
        console.log(`Changelog entry for ${colors.cyan(version)} already exists, skipping.`)
        return
    }
    const date = new Date()
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()
    const stub = `## ${version} - ${dd}.${mm}.${yyyy}

### Highlights


### Added


### Changed


### Fixed


### Documentation

`
    await writeFileAsync(entryPath, stub)
    console.log(`Created changelog entry ${colors.magenta(path.relative(process.cwd(), entryPath))}`)

    const loadDirective = `[[load:.changelog/${version}.md]]`
    const index = await readFileAsync(CHANGELOG_INDEX, 'utf8')
    if (index.includes(loadDirective)) return
    const firstLoadMatch = index.match(/\[\[load:\.changelog\/[^\]]+\]\]/)
    const updated = firstLoadMatch
        ? index.replace(firstLoadMatch[0], `${loadDirective}\n\n${firstLoadMatch[0]}`)
        : `${index.trimEnd()}\n\n${loadDirective}\n`
    await writeFileAsync(CHANGELOG_INDEX, updated)
    console.log(`Prepended load directive to ${colors.magenta('.changelog/CHANGELOG.md')}`)
}

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

        if (major) {
            nextMajor = maj + 1
            nextMinor = 0
            nextPatch = 0
        } else if (minor) {
            nextMinor = min + 1
            nextPatch = 0
        } else if (patch) {
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
    await createChangelogEntry(newVersion)
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

