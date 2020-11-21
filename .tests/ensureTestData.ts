/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import * as fs from 'fs'
import * as path from 'path'
import env from '../server/utils/env'
import AzStorageService from '../server/api/services/azstorage'
import createDebug from 'debug'
const debug = createDebug('.tests/ensureTestData')

const azstorage = new AzStorageService({
  subscription: {
    id: 'f3d3b506-8fa9-4e40-b1a0-b667dd9ca94b',
    name: 'TESTS_AZURE_STORAGE_CONNECTION_STRING',
    connectionString: env('TESTS_AZURE_STORAGE_CONNECTION_STRING')
  }
})

/**
 * Ensure test data
 */
export const ensureTestData = () =>
  new Promise<any>((resolve, reject) => {
    if (!env('TESTS_AZURE_STORAGE_CONNECTION_STRING')) {
      debug('Missing environment variable TESTS_AZURE_STORAGE_CONNECTION_STRING')
      reject()
    } else {
      try {
        const data: any[][] = require('./testData.json')
        debug(
          'testData.json found with %d projects, %s customers and %d labels',
          ...data.map((v) => v.length)
        )
        resolve(data)
      } catch (error) {
        debug('Querying Azure Table Storage for test data...')
        Promise.all([azstorage.getProjects(), azstorage.getCustomers(), azstorage.getLabels()])
          .then((value) => {
            fs.writeFile(
              path.resolve(__dirname, 'testData.json'),
              JSON.stringify(value),
              null,
              () => {
                debug(
                  'Retrieved %d projects, %s customers and %d labels. Saving result to testData.json',
                  ...value.map((v) => v.length)
                )
                resolve(value)
              }
            )
          })
          .catch((error) => {
            debug('An error occured querying Azure Table Storage...')
            reject(error)
          })
      }
    }
  })
