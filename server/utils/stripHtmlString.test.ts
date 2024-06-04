import test from 'ava'
import stripHtml from 'string-strip-html'

test('stripHtmlString returns null for undefined string', (t) => {
  const { result } = stripHtml(undefined as any)
  t.is(result, null as any)
})

test('stripHtmlString returns null for null string', (t) => {
  const { result } = stripHtml(null as any)
  t.is(result, null as any)
})

test('stripHtmlString strips html from string', (t) => {
  const { result } = stripHtml(`<p>This is some <b>bold</b> text.</p>`)
  t.is(result, 'This is some bold text.')
})
