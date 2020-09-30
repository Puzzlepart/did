require('dotenv').config()
const fs = require('fs')
const path = require('path')
const StorageService = require('../services/storage')
const log = require('debug')('tests/ensureTestData')

let storage = new StorageService({
  connectionString: process.env.TESTS_AZURE_STORAGE_CONNECTION_STRING
})

module.exports = () => new Promise((resolve, reject) => {
  if(!process.env.TESTS_AZURE_STORAGE_CONNECTION_STRING) {
    reject('Missing environment variable TESTS_AZURE_STORAGE_CONNECTION_STRING')
  }
  try {
    const data = require('./testData.json')
    log('testData.json found')
    resolve(data)
  } catch (error) {
    log('testData.json missing. Querying Azure Table Storage...')
    Promise.all([
      storage.getProjects(),
      storage.getCustomers(),
      storage.getLabels()
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
})