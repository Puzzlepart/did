import { strictEqual, deepStrictEqual } from 'assert'
import { header } from '../@utils'
import DateUtils, { DateObject } from '../../client/utils/date'
import date from '../../client/utils/date'

describe(header('DateUtils'), async () => {
  before(() => {
    DateUtils.setup('en-gb')
  })

  describe('getYear', () => {
    it('should return 2020 for 2020-05-06', () => {
      strictEqual(DateUtils.getYear('2020-05-06'), 2020)
    })

    it('should return 2019 for 2019-05-06', () => {
      strictEqual(DateUtils.getYear('2019-05-06'), 2019)
    })
  })

  describe('getMonthIndex', () => {
    it('should return 1 for 2020-01-01', () => {
      strictEqual(DateUtils.getMonthIndex('2020-01-01'), 1)
    })

    it('should return 1 for 2019-01-01', () => {
      strictEqual(DateUtils.getMonthIndex('2019-01-01'), 1)
    })
  })

  describe('getWeek', () => {
    it('should return 9 for 2020-03-01', () => {
      strictEqual(DateUtils.getWeek('2020-03-01'), 9)
    })

    it('should return 1 for 2020-01-06', () => {
      strictEqual(DateUtils.getWeek('2020-01-04'), 1)
    })
  })

  describe('getMonthNames', () => {
    describe('locale: en', () => {
      it('should return an array with 12 items', () => {
        strictEqual(DateUtils.getMonthNames().length, 12)
        deepStrictEqual(DateUtils.getMonthNames(), [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ])
      })
    })

    describe('locale: nb', () => {
      before(() => {
        DateUtils.setup('nb')
      })

      it('should return an array with 12 items', () => {
        strictEqual(DateUtils.getMonthNames().length, 12)
        deepStrictEqual(DateUtils.getMonthNames(), [
          'Januar',
          'Februar',
          'Mars',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Desember'
        ])
      })

      after(() => {
        DateUtils.setup('en-gb')
      })
    })
  })

  describe('getMonthYear', () => {
    it('should return correct object for 2020-03-01', () => {
      deepStrictEqual(DateUtils.getMonthYear('2020-03-01'), {
        monthName: 'March',
        monthNumber: 3,
        year: 2020
      })
    })

    it('should return correct object for 2020-04-01', () => {
      deepStrictEqual(DateUtils.getMonthYear('2020-04-01'), {
        monthName: 'April',
        monthNumber: 4,
        year: 2020
      })
    })
  })

  describe('getDays', () => {
    it('should return days between 2020-02-17 -2020-02-17 in default format dddd DD', () => {
      const days = DateUtils.getDays('2020-02-17', '2020-02-23')
      deepStrictEqual(days, [
        'Monday 17',
        'Tuesday 18',
        'Wednesday 19',
        'Thursday 20',
        'Friday 21',
        'Saturday 22',
        'Sunday 23'
      ])
    })

    it('should return days between 2020-02-17 -2020-02-17 in format dddd', () => {
      const days = DateUtils.getDays('2020-02-17', '2020-02-23', 'dddd')
      deepStrictEqual(days, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    })
  })

  describe('getTimespanString', () => {
    it('should return 11 - 16 May 2020', () => {
      let a = new DateObject('2020-05-11', DateUtils)
      let b = new DateObject('2020-05-16', DateUtils)
      deepStrictEqual(DateUtils.getTimespanString(a, b), '11 - 16 May 2020')
    })

    it('should return 16 May - 16 June 2020', () => {
      let a = new DateObject('2020-05-16', DateUtils)
      let b = new DateObject('2020-06-16', DateUtils)
      deepStrictEqual(DateUtils.getTimespanString(a, b), '16 May - 16 June 2020')
    })

    it('should return 16 May 2020 - 16 June 2021', () => {
      let a = new DateObject('2020-05-16', DateUtils)
      let b = new DateObject('2021-06-16', DateUtils)
      deepStrictEqual(DateUtils.getTimespanString(a, b), '16 May 2020 - 16 June 2021')
    })
  })
})
