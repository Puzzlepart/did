import test from 'ava'
import { stripHtmlString } from './stripHtmlString'

test('stripHtmlString strips html from string', (t) => {
  const result = stripHtmlString(`<p>This is some <b>bold</b> text.</p>`)
  t.is(result, 'This is some bold text.')
})
