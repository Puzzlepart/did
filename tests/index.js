const { deepStrictEqual, strictEqual, notStrictEqual } = require('assert')
const { first, any, isArray } = require('underscore')
const EventMatching = require('../api/graphql/resolvers/timesheet.matching')
const ensureTestData = require('./ensureTestData')
const utils = require('../utils')
const AzTableUtilities = require('../utils/table')

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
    it('IAM VAC in category should match against customer Employee Absence', () => {
      testEvent.categories.push('IAM VAC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[IAM VAC] in subject should match against customer Employee Absence', () => {
      testEvent.title = '[IAM VAC]'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[IAM VAC] in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event [IAM VAC]'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('{IAM VAC} in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event {IAM VAC}'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('/IAM VAC/ in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event /IAM VAC/'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('IAM ILL in category should take presedence before IAM VAC in subject', () => {
      testEvent.body = 'Hello this is an event /IAM VAC/'
      testEvent.categories.push('IAM ILL')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.project.id, 'IAM ILL')
    })

    it('"AK ASSISTCH: ASSIST-3063" in subject should match to AK ASSISTCH', () => {
      testEvent.body = 'AK ASSISTCH: ASSIST-3063'
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.project.id, 'AK ASSISTCH')
    })
  })

  describe('Matching suggestions', () => {
    it('{IAM VAK} should suggest {IAM VAC}', () => {
      testEvent.categories.push('IAM VAK')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.suggestedProject.id, 'IAM VAC')
    })

    it('{IAM TRAVELLING} in category should yield no project but a match against Employee Absence', () => {
      testEvent.categories.push('{IAM WHAAT}')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.name, 'Employee Absence')
    })

    it('4SUBSEA ABC in category should yield no project but a match against 4SUBSEA', () => {
      testEvent.categories.push('4SUBSEA ABC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.key, '4SUBSEA')
    })

    it('4SUBSEA ABC in body should yield no project and no match against customer 4SUBSEA', () => {
      testEvent.body = 'Hello this is an event 4SUBSEA ABC'
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
      testEvent.categories.push('IAM VAC')
      testEvent.categories.push('ignore')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.isSystemIgnored, true)
    })

    it('IAM VAC in categories takes presedence before [ignore] (lowercase) in body', () => {
      testEvent.categories.push('IAM VAC')
      testEvent.body = 'This is the body of the event [ignore]'
      const event = first(eventMatching.matchEvents([testEvent]))
      notStrictEqual(event.isSystemIgnored, true)
    })
  })

  describe('Matching event labels', () => {
    it('[crayon-timereg] in categories should add matching label', () => {
      testEvent.categories.push('crayon-timereg')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(
        any(event.labels, lbl => lbl.name === 'crayon-timereg'),
        true
      )
    })

    it('[Overtime] in categories should add matching label', () => {
      testEvent.categories.push('Overtime')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(
        any(event.labels, lbl => lbl.name === 'Overtime'),
        true
      )
    })

    it('[Overtime] and [4SUBSEA SHARE] in categories should add matching label', () => {
      testEvent.categories.push('Overtime')
      testEvent.categories.push('4SUBSEA SHARE')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.project.key, 'SHARE')
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