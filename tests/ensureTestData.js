require('dotenv').config()
const fs = require('fs')
const path = require('path')
const env = require('../server/utils/env')
const AzStorageService = require('../server/services/azstorage')
const log = require('debug')('tests/ensureTestData')

let azstorage = new AzStorageService({
  connectionString: env('TESTS_AZURE_STORAGE_CONNECTION_STRING')
})

module.exports = () => new Promise((resolve, reject) => {
  if (!env('TESTS_AZURE_STORAGE_CONNECTION_STRING')) {
    log('Missing environment variable TESTS_AZURE_STORAGE_CONNECTION_STRING')
    reject()
  } else {
    try {
      const data = require('./testData.json')
      log('testData.json found')
      resolve(data)
    } catch (error) {
      log('testData.json missing. Querying Azure Table Storage...')
      Promise.all([
        azstorage.getProjects(),
        azstorage.getCustomers(),
        azstorage.getLabels()
      ]).then(value => {
        fs.writeFile(
          path.resolve(__dirname, 'testData.json'),
          JSON.stringify(value),
          null,
          () => {
            log('Saving result to testData.json')
            resolve(value)
          })
      }).catch(error => {
        log('An error occured querying Azure Table Storage...')
        reject(error)
      })
    }
  }
})