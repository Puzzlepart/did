import { deepStrictEqual, strictEqual } from 'assert'
import { contains } from 'underscore'
import { startsWith } from 'underscore.string'
import AzTableUtilities from '../../server/utils/table'
import { header } from '../@utils'

describe(header('AzTableUtilities'), async () => {
  const tableUtils = new AzTableUtilities(null)

  describe('parseAzEntity', () => {
    it('should return an object with title and modified', () => {
      const item = {
        PartitionKey: {
          $: 'Edm.String',
          _: 'Default'
        },
        RowKey: {
          $: 'Edm.String',
          _: '001'
        },
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
      deepStrictEqual(
        contains(Object.keys(json), 'title') && contains(Object.keys(json), 'modified'),
        true
      )
    })

    it('should parse settings as JSON', () => {
      const item = {
        PartitionKey: {
          $: 'Edm.String',
          _: 'Default'
        },
        RowKey: {
          $: 'Edm.String',
          _: '001'
        },
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

    it('should parse as array', () => {
      const item = {
        PartitionKey: {
          $: 'Edm.String',
          _: 'Default'
        },
        RowKey: {
          $: 'Edm.String',
          _: '001'
        },
        Name: {
          $: 'Edm.String',
          _: 'Admin'
        },
        Icon: {
          $: 'Edm.String',
          _: 'Admin'
        },
        Permissions: {
          $: 'Edm.String',
          _:
            'e18a7c45|289a64ab|2653c3aa|a031c42f|ef4032fb|c5439319|09909241|8b39db3d|15e40e99|cd52a735|f5a82c37'
        }
      }
      const json = tableUtils.parseAzEntity(item, { typeMap: { Permissions: 'Custom.ArrayPipe' } })
      strictEqual(json.permissions.length, 11)
    })
  })

  describe('convertToAzEntity', () => {
    it('should convert to AZ entity', () => {
      const values = {
        title: 'Hello world',
        modified: '2020-10-05T10:36:21.019Z'
      }
      const entity = tableUtils.convertToAzEntity(
        '78d15b30-499a-4d2f-96a5-a9644c57e741',
        values,
        'default',
        {
          removeBlanks: true,
          typeMap: {
            modified: 'datetime'
          }
        }
      )
      deepStrictEqual(entity.PartitionKey._, 'default')
      deepStrictEqual(entity.RowKey._, '78d15b30-499a-4d2f-96a5-a9644c57e741')
      deepStrictEqual(entity.Modified.$, 'Edm.DateTime')
    })

    it('should convert date correctly', () => {
      const values = {
        title: 'Event 1',
        modified: '2020-12-17T12:30:00.0000000Z'
      }
      const entity = tableUtils.convertToAzEntity(
        '78d15b30-499a-4d2f-96a5-a9644c57e741',
        values,
        'default',
        {
          removeBlanks: true,
          typeMap: {
            modified: 'datetime'
          }
        }
      )
      deepStrictEqual(entity.PartitionKey._, 'default')
      deepStrictEqual(entity.Modified.$, 'Edm.DateTime')
      deepStrictEqual(entity.Modified._.toISOString(), '2020-12-17T12:30:00.000Z')
    })

    it('should convert JSON property to string', () => {
      const values = {
        title: 'Hello world',
        modified: '2020-10-05T10:36:21.019Z',
        settings: { enabled: true }
      }
      const entity = tableUtils.convertToAzEntity(
        '78d15b30-499a-4d2f-96a5-a9644c57e741',
        values,
        'default',
        {
          removeBlanks: true,
          typeMap: {
            modified: 'datetime',
            settings: 'json'
          }
        }
      )
      strictEqual(startsWith(entity.Settings._, 'json:'), true)
    })
  })
})
