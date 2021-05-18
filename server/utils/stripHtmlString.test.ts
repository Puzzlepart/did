import test from 'ava'
import { stripHtmlString } from './stripHtmlString'

test('stripHtmlString returns null for undefined string', (t) => {
  const result = stripHtmlString(undefined)
  t.is(result, null)
})

test('stripHtmlString returns null for null string', (t) => {
  const result = stripHtmlString(null)
  t.is(result, null)
})

test('stripHtmlString strips html from string', (t) => {
  const result = stripHtmlString(`<p>This is some <b>bold</b> text.</p>`)
  t.is(result, 'This is some bold text.')
})
