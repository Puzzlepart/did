import { deepStrictEqual, strictEqual } from 'assert'
import { startsWith } from 'underscore.string'
import AzTableUtilities from '../server/utils/table'
import { header } from './@utils'

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
