const concurrently = require('concurrently')
const inquirer = require('inquirer')
const util = require('util')
const { cyan, white } = require('chalk')
const log = console.log
const { commitlint } = require('../package.json')
const child_process = require('child_process')
const exec = util.promisify(child_process.exec)

async function commit_changes() {
    const input = await inquirer.prompt([
        {
            type: 'list',
            name: 'commit_prefix',
            message: 'Select commit prefix',
            choices: commitlint.rules['type-enum'][2]
        },
        {
            type: 'input',
            name: 'commit_message',
            message: 'Enter a commit message:'
        }
    ])
    await concurrently([
        { command: 'npm run typedoc', name: 'typedoc' },
        { command: 'npm run lint:fix', name: 'eslint' }
    ], {})
    const commit_message =`${input.commit_prefix}: ${input.commit_message}`
    await exec('git add --all')
    await exec(`git commit -m "${commit_message}"`)
    log(cyan(`Succesfully commited changes with message: ${white(commit_message)}`))
    process.exit(0)
}

commit_changes()