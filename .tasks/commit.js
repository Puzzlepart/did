const inquirer = require('inquirer')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
const util = require('util')
const { cyan, white, red } = require('chalk')
const log = console.log
const { commitlint, gitmoji } = require('../package.json')
const child_process = require('child_process')
const exec = util.promisify(child_process.exec)

async function commit_changes() {
    const input = await inquirer.prompt([
        {
            type: 'autocomplete',
            name: 'commit_prefix',
            message: 'Select commit prefix',
            choices: commitlint.rules['type-enum'][2],
            source: async (_a, input) => {
                const type_enums = commitlint.rules['type-enum'][2]
                return type_enums
                    .filter(
                        (type_enum) =>
                            type_enum.toLowerCase().indexOf((input || '').toLowerCase()) !== -1
                    )
                    .map((type_enum) => ({
                        value: type_enum,
                        name: `${gitmoji[type_enum]}\t${type_enum}`
                    }))
            },
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
    let commit_message = `${input.commit_prefix}: ${input.commit_message.toLowerCase()}`
    try {
        await exec('git add --all')
        if (gitmoji[input.commit_prefix]) {
            commit_message += ` ${gitmoji[input.commit_prefix]}`
        }
        await exec(`git commit -m "${commit_message}" --no-verify`)
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