const inquirer = require('inquirer')
const util = require('util')
const { cyan, white, red } = require('chalk')
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
        },
        {
            type: 'confirm',
            name: 'push',
            message: 'Do you want to push the changes right away?',
            default: true
        }
    ])
    const commit_message = `${input.commit_prefix}: ${input.commit_message.toLowerCase()}`
    try {
        await exec('git add --all')
        await exec(`git commit -m "${commit_message}"`)
        if (input.push) {
            await exec('git pull')
            await exec('git push')
        }
        log(cyan(`Succesfully commited changes with message: ${white(commit_message)}`))
    } catch (error) {
        console.log(error)
        log(red('An error occured commiting your changes.'))
    } finally {
        process.exit(0)
    }
}

commit_changes()