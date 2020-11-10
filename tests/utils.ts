import { deepStrictEqual, strictEqual } from 'assert'
import { first, isArray } from 'underscore'
import { startsWith } from 'underscore.string'
import * as utils from '../server/utils'
import AzTableUtilities from '../server/utils/table'
import { header } from './@utils'

describe(header('utils'), async () => {
  describe('getDurationHours', () => {
    it('should return 0', () => {
      const start = new Date().toISOString()
      const end = new Date().toISOString()
      const duration = utils.getDurationHours(start, end)
      strictEqual(duration, 0)
    })

    it('should return 3', () => {
      const start = new Date(2020, 10, 20, 13).toISOString()
      const end = new Date(2020, 10, 20, 16).toISOString()
      const duration = utils.getDurationHours(start, end)
      strictEqual(duration, 3)
    })

    it('should return 24', () => {
      const start = new Date(2020, 10, 20, 13).toISOString()
      const end = new Date(2020, 10, 21, 13).toISOString()
      const duration = utils.getDurationHours(start, end)
      strictEqual(duration, 24)
    })
  })

  describe('getPeriod', () => {
    it('should return 24_6_2020 for 10th of June 2020', () => {
      const date = new Date(2020, 5, 10).toISOString()
      const period = utils.getPeriod(date)
      strictEqual(period, '24_6_2020')
    })
  })

  describe('getWeek', () => {
    it('should return 24 for 10th of June 2020', () => {
      const date = new Date(2020, 5, 10).toISOString()
      const week = utils.getWeek(date)
      strictEqual(week, 24)
    })
  })

  describe('getMonthIndex', () => {
    it('should return 6 for June', () => {
      const date = new Date(2020, 5, 10).toISOString()
      const monthIndex = utils.getMonthIndex(date)
      strictEqual(monthIndex, 6)
    })
  })

  describe('toArray', () => {
    it('should return an array', () => {
      const array = utils.toArray('1|2|3|4|5')
      strictEqual(first(array), '1')
      strictEqual(isArray(array), true)
    })
  })
})

describe(header('AzTableUtilities'), async () => {
  const tableUtils = new AzTableUtilities(null)

  describe('parseAzEntity', () => {
    it('should return an object with title and modified', () => {
      const item = {
        Title: {
          $: 'Edm.String',
          _: 'Hello world'
        },
        Modified: {
          $: 'Edm.DateTime',
          _: new Date('2020-10-05T10:36:21.019Z')
        }
      }
      const json = tableUtils.parseAzEntity(item)
      deepStrictEqual(Object.keys(json), ['title', 'modified'])
    })

    it('should parse settings as JSON', () => {
      const item = {
        Title: {
          $: 'Edm.String',
          _: 'Hello world'
        },
        Settings: {
          $: 'Edm.String',
          _: 'json:{"enabled":true}'
        }
      }
      const json = tableUtils.parseAzEntity(item)
      strictEqual(json.settings.enabled, true)
    })
  })

  describe('convertToAzEntity', () => {
    it('should convert to AZ entity', () => {
      const values = {
        title: 'Hello world',
        modified: '2020-10-05T10:36:21.019Z'
      }
      const entity = tableUtils.convertToAzEntity('78d15b30-499a-4d2f-96a5-a9644c57e741', values, 'default', {
        removeBlanks: true,
        typeMap: {
          modified: 'datetime'
        }
      })
      deepStrictEqual(entity.PartitionKey._, 'default')
      deepStrictEqual(entity.RowKey._, '78d15b30-499a-4d2f-96a5-a9644c57e741')
      deepStrictEqual(entity.Modified.$, 'Edm.DateTime')
    })

    it('should convert JSON property to string', () => {
      const values = {
        title: 'Hello world',
        modified: '2020-10-05T10:36:21.019Z',
        settings: { enabled: true }
      }
      const entity = tableUtils.convertToAzEntity('78d15b30-499a-4d2f-96a5-a9644c57e741', values, 'default', {
        removeBlanks: true,
        typeMap: {
          modified: 'datetime',
          settings: 'json'
        }
      })
      strictEqual(startsWith(entity.Settings._, 'json:'), true)
    })
  })
})
