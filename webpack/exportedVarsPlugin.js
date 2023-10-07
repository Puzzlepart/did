/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prevent-abbreviations */
const webpack = require('webpack')
const constants = require('./constants')

module.exports = (gitRevisionPlugin) => {
    const repositoryUrl = constants.get('REPOSITORY_URL')
    const commithash = gitRevisionPlugin.commithash()
    const branch = gitRevisionPlugin.branch()
    const lastcommitdatetime = gitRevisionPlugin.lastcommitdatetime()
    const commiturl = `${repositoryUrl}/commit/${commithash}`
    const branchurl = `${repositoryUrl}/tree/${branch}`
    return new webpack.DefinePlugin({
        ...constants.get('EXPORTED_ENV_VARS'),
        COMMIT_HASH: JSON.stringify(commithash),
        BRANCH: JSON.stringify(branch),
        LAST_COMMIT_DATETIME: JSON.stringify(lastcommitdatetime),
        COMMIT_URL: JSON.stringify(commiturl),
        BRANCH_URL: JSON.stringify(branchurl),
    })
}