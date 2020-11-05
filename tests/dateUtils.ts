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
})