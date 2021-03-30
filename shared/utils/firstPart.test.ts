import test from 'ava'
import { firstPart } from './firstPart'

test('firstPart yields correct result for two words', t => {
    const result = firstPart('two words')
    t.is(result, 'two')
})

test('firstPart yields correct result for two,words', t => {
    const result = firstPart('two,words', ',')
    t.is(result, 'two')
})
