require('dotenv').config()
const fs = require('fs')
const sample = './.env.sample'

async function createDotEnv() {
    if (fs.existsSync(sample)) {
        let content = fs.readFileSync(sample, 'utf-8')
        fs.writeFileSync('.env', content)
    }
}

createDotEnv()