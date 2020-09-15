const assert = require('assert')
const { first, any } = require('underscore')
const EventMatching = require('../api/graphql/resolvers/timesheet.matching')
const projects = require('./data/projects.json')
const customers = require('./data/customers.json')
const labels = require('./data/labels.json')

describe('Event matching', () => {
  let testEvent = {}
  let eventMatching = new EventMatching(projects, customers, labels)

  beforeEach(() => {
    testEvent = {
      title: 'Important meeting',
      categories: [],
    }
  })

  describe('Match against project', () => {
    it('IAM VAC in category should match against customer Employee Absence', () => {
      testEvent.categories.push('IAM VAC')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[IAM VAC] in subject should match against customer Employee Absence', () => {
      testEvent.title = '[IAM VAC]'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('[IAM VAC] in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event [IAM VAC]'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('{IAM VAC} in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event {IAM VAC}'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('/IAM VAC/ in body should match against customer Employee Absence', () => {
      testEvent.body = 'Hello this is an event /IAM VAC/'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('IAM ILL in category should take presedence before IAM VAC in subject', () => {
      testEvent.body = 'Hello this is an event /IAM VAC/'
      testEvent.categories.push('IAM ILL')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.project.id, 'IAM ILL')
    })

    it('"AK ASSISTCH: ASSIST-3063" in subject should match to AK ASSISTCH', () => {
      testEvent.body = 'AK ASSISTCH: ASSIST-3063'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.project.id, 'AK ASSISTCH')
    })
  })

  describe('Matching suggestions', () => {
    it('{4SUBSEA FLEXSHARZ} should suggest {4SUBSEA FLEXSHARE}', () => {
      testEvent.body = 'Hello this is an event [4SUBSEA FLEXSHARZ]'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.suggestedProject.id, '4SUBSEA FLEXSHARE')
    })

    it('{4SUBSEA FLEXSHARZE} should suggest {4SUBSEA FLEXSHARE}', () => {
      testEvent.body = 'Hello this is an event [4SUBSEA FLEXSHARZE]'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.suggestedProject.id, '4SUBSEA FLEXSHARE')
    })

    it('{IAM VAK} should suggest {IAM VAC}', () => {
      testEvent.categories.push('IAM VAK')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.suggestedProject.id, 'IAM VAC')
    })

    it('{IAM TRAVELLING} in category should yield no project but a match against Employee Absence', () => {
      testEvent.categories.push('{IAM WHAAT}')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.name, 'Employee Absence')
    })

    it('4SUBSEA ABC in category should yield no project but a match against 4SUBSEA', () => {
      testEvent.categories.push('4SUBSEA ABC')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer.id, '4SUBSEA')
    })

    it('4SUBSEA ABC in body should yield no project and no match against customer 4SUBSEA', () => {
      testEvent.body = 'Hello this is an event 4SUBSEA ABC'
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(event.customer, undefined)
    })
  })

  describe('Matching event labels', () => {
    it('{overtid-40} in categories should add matching label', () => {
      testEvent.categories.push('overtid-40')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(
        any(event.labels, (lbl) => lbl.name === 'overtid-40'),
        true
      )
    })

    it('{OVERTID-40} in categories should not add any label', () => {
      testEvent.categories.push('OVERTID-40')
      const event = first(eventMatching.match([testEvent]))
      assert.strictEqual(
        any(event.labels, (lbl) => lbl.name === 'OVERTID-40'),
        false
      )
    })
  })
})
