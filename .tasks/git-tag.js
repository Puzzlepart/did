const package = require('../package.json')
const { exec } = require('child_process')
const { promisify } = require('util')
const colors = require('colors/safe')

const execAsync = promisify(exec)

async function tag(tag) {
    await execAsync(`git tag -a v${tag} -m "${tag}"`)
    await execAsync('git push --tags');

    console.log(colors.green(`Tag v${tag} successfully created and pushed to ${package.repository.url}.`))
}

tag(package.version)