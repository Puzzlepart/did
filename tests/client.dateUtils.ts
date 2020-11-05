import { strictEqual } from 'assert'
import { header } from './@utils'
import dateUtils from '../client/utils/date'

describe(header('dateUtils'), async () => {
  before(() => {
    dateUtils.setup('en-gb')
  })

  describe('getYear', () => {
    it('should return 2020 for 2020-05-06', () => {
      strictEqual(dateUtils.getYear('2020-05-06'), 2020)
    })

    it('should return 2019 for 2019-05-06', () => {
      strictEqual(dateUtils.getYear('2019-05-06'), 2019)
    })
  })

  describe('getMonthIndex', () => {
    it('should return 1 for 2020-01-01', () => {
      strictEqual(dateUtils.getMonthIndex('2020-01-01'), 1)
    })

    it('should return 1 for 2019-01-01', () => {
      strictEqual(dateUtils.getMonthIndex('2019-01-01'), 1)
    })
  })

  describe('getWeek', () => {
    it('should return 9 for 2020-03-01', () => {
      strictEqual(dateUtils.getWeek('2020-03-01'), 9)
    })

    it('should return 1 for 2020-01-06', () => {
      strictEqual(dateUtils.getWeek('2020-01-04'), 1)
    })
  })
})