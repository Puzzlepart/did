import test from 'ava'
import stripHtml from 'string-strip-html'

test('stripHtmlString strips html from string', (t) => {
  const { result } = stripHtml(`<p>This is some <b>bold</b> text.</p>`)
  t.is(result, 'This is some bold text.')
})
