import test from 'ava'
import { DateObject } from './DateObject'

test('DateObject.fromObject creates a valid date object from object', (t) => {
    const date = new DateObject().fromObject({ year: 2023, week: 11 })
    t.is(date.jsDate.getFullYear(), 2023)
    t.is(date.jsDate.getMonth(), 2)
})