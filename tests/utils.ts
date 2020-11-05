import { strictEqual } from 'assert'
import { first, isArray } from 'underscore'
import * as utils from '../server/utils'
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