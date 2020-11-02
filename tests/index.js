const { deepStrictEqual, strictEqual, notStrictEqual } = require('assert')
const { first, any, isArray } = require('underscore')
const EventMatching = require('../server/api/graphql/resolvers/timesheet.matching')
const ensureTestData = require('./ensureTestData')
const utils = require('../server/utils')
const AzTableUtilities = require('../server/utils/table')

describe('Event matching', async () => {
  let testEvent = {}
  let eventMatching

  before(async () => {
    const [projects, customers, labels] = await ensureTestData()
    eventMatching = new EventMatching(projects, customers, labels)
  })

  beforeEach(() => {
    testEvent = {
      title: 'Important meeting',
      categories: [],
    }
  })

  describe('Match against project', () => {
    it('ABS VAC in category should match against customer Employee Absence', () => {
      testEvent.categories.push('ABS VAC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[ABS VAC] in subject should match against customer Employee Absence', () => {
      testEvent.title = '[ABS VAC]'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[ABS VAC] in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event [ABS VAC]'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('{ABS VAC} in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event {ABS VAC}'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('/ABS VAC/ in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event /ABS VAC/'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('ABS ILL in category should take presedence before ABS VAC in subject', () => {
      testEvent.body = 'Hello this is an event /ABS VAC/'
      testEvent.categories.push('ABS ILL')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.project.id, 'ABS ILL')
    })
  })

  describe('Matching suggestions', () => {
    it('{ABS VAK} should suggest {ABS VAC}', () => {
      testEvent.categories.push('ABS VAK')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.suggestedProject.id, 'ABS VAC')
    })

    it('{ABS TRAVEL} in category should yield no project but a match against Employee Absence', () => {
      testEvent.categories.push('{ABS TRAVEL}')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('CONTOSO ABC in category should yield no project but a match against CONTOSO', () => {
      testEvent.categories.push('CONTOSO ABC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.key, 'CONTOSO')
    })

    it('CONTOSO ABC in body should yield no project and no match against customer CONTOSO', () => {
      testEvent.body = 'Hello this is an event CONTOSO ABC'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer, undefined)
    })
  })

  describe('System ignore', () => {
    it('IGNORE (uppercase) in categories should set the event as ignored', () => {
      testEvent.categories.push('IGNORE')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.isSystemIgnored, true)
    })

    it('ignore (lowercase) in categories should set the event as ignored', () => {
      testEvent.categories.push('ignore')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.isSystemIgnored, true)
    })

    it('[ignore] (lowercase) in body should set the event as ignored', () => {
      testEvent.body = 'This is the body of the event [ignore]'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.isSystemIgnored, true)
    })

    it('[ignore] (lowercase) in body should set the event as ignored even with an event category', () => {
      testEvent.categories.push('ABS VAC')
      testEvent.categories.push('ignore')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.isSystemIgnored, true)
    })

    it('ABS VAC in categories takes presedence before [ignore] (lowercase) in body', () => {
      testEvent.categories.push('ABS VAC')
      testEvent.body = 'This is the body of the event [ignore]'
      const event = first(eventMatching.matchEvents([testEvent]))
      notStrictEqual(event.isSystemIgnored, true)
    })
  })

  describe('Matching event labels', () => {
    it('[overtime-40] in categories should add matching label', () => {
      testEvent.categories.push('overtime-40')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(
        any(event.labels, lbl => lbl.name === 'overtime-40'),
        true
      )
    })

    it('[overtime-40] and [CONTOSO ABC] in categories should add matching label', () => {
      testEvent.categories.push('overtime-40')
      testEvent.categories.push('CONTOSO ABC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.key, 'CONTOSO')
      strictEqual(
        any(event.labels, lbl => lbl.name === 'Overtime'),
        true
      )
    })
  })
})

describe('Utils', async () => {
  describe('getDurationHours', () => {
    it('should return 0', () => {
      const start = new Date().toISOString()
      const end = new Date().toISOString()
      const duration = utils.getDurationHours(start, end)
      strictEqual(duration, 0)
    })

    it('should return 3', () => {
      const start = new Date(2020, 10, 20, 13, 00).toISOString()
      const end = new Date(2020, 10, 20, 16, 00).toISOString()
      const duration = utils.getDurationHours(start, end)
      strictEqual(duration, 3)
    })

    it('should return 24', () => {
      const start = new Date(2020, 10, 20, 13, 00).toISOString()
      const end = new Date(2020, 10, 21, 13, 00).toISOString()
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

describe('AzTableUtilities', async () => {
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
  })

  describe('convertToAzEntity', () => {
    it('should convert to AZ entity', () => {
      const values = {
        title: 'Hello world',
        modified: '2020-10-05T10:36:21.019Z',
      }
      const entity = tableUtils.convertToAzEntity(
        '78d15b30-499a-4d2f-96a5-a9644c57e741',
        values,
        'default',
        {
          removeBlanks: true,
          typeMap: {
            modified: 'datetime',
          }
        }
      )
      deepStrictEqual(entity.PartitionKey._, 'default')
      deepStrictEqual(entity.RowKey._, '78d15b30-499a-4d2f-96a5-a9644c57e741')
      deepStrictEqual(entity.Modified.$, 'Edm.DateTime')
    })
  })
})