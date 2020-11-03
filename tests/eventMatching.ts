import { notStrictEqual, strictEqual } from 'assert'
import { any, first } from 'underscore'
import EventMatching from '../server/api/graphql/resolvers/timesheet.matching'
import { header } from './@utils'
import ensureTestData from './ensureTestData'

describe(header('Event matching'), async () => {
  let testEvent: any = {}
  let eventMatching: EventMatching

  before(async () => {
    const [projects, customers, labels] = await ensureTestData()
    eventMatching = new EventMatching(projects, customers, labels)
  })

  beforeEach(() => {
    testEvent = {
      title: 'Important meeting',
      categories: []
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
        any(event.labels, (lbl) => lbl.name === 'overtime-40'),
        true
      )
    })

    it('[overtime-40] and [CONTOSO ABC] in categories should add matching label', () => {
      testEvent.categories.push('overtime-40')
      testEvent.categories.push('CONTOSO ABC')
      const event = first(eventMatching.matchEvents([testEvent]))
      strictEqual(event.customer.key, 'CONTOSO')
    })
  })
})
