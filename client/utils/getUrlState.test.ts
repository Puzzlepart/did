import test from 'ava'

// getUrlState uses window.atob and document.location (hash) / window.location.href (search).
// We set up minimal globals before importing so the module resolves them at call time.

function b64(str: string) {
  return Buffer.from(str).toString('base64')
}

function setupHashWindow(hash: string) {
  ;(global as any).document = { location: { hash } }
  ;(global as any).window = {
    atob: (s: string) => Buffer.from(s, 'base64').toString('utf-8'),
    location: { href: 'http://localhost/' }
  }
}

function setupSearchWindow(search: string) {
  ;(global as any).document = { location: { hash: '' } }
  ;(global as any).window = {
    atob: (s: string) => Buffer.from(s, 'base64').toString('utf-8'),
    location: { href: `http://localhost/${search}` }
  }
}

// Import lazily so globals are set before first call
function getUrlState<T = any>(
  key: string,
  location: 'hash' | 'search',
  obj = false
): T {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { getUrlState: fn } = require('./getUrlState')
  return fn(key, location, obj)
}

// --- valid round-trip ---

test('getUrlState: valid base64 JSON round-trips via hash', (t) => {
  const payload = { week: 42, year: 2026 }
  setupHashWindow(`#state=${b64(JSON.stringify(payload))}`)
  const result = getUrlState('state', 'hash', true)
  t.deepEqual(result, payload)
})

test('getUrlState: valid base64 JSON round-trips via search', (t) => {
  const payload = { tab: 'custom' }
  setupSearchWindow(`?filter=${b64(JSON.stringify(payload))}`)
  const result = getUrlState('filter', 'search', true)
  t.deepEqual(result, payload)
})

// --- crash guard: non-base64 input ---

test('getUrlState: non-base64 garbage returns fallback ({}) without throwing', (t) => {
  setupHashWindow('#state=!!!not-base64!!!')
  t.notThrows(() => {
    const result = getUrlState('state', 'hash', true)
    t.deepEqual(result, {})
  })
})

// --- crash guard: base64 of non-JSON ---

test('getUrlState: base64 of plain text returns fallback ({}) without throwing', (t) => {
  setupHashWindow(`#state=${b64('this is not json')}`)
  t.notThrows(() => {
    const result = getUrlState('state', 'hash', true)
    t.deepEqual(result, {})
  })
})

// --- shape mismatch: parsing succeeds, shape is caller's responsibility ---

test('getUrlState: base64 JSON with unexpected shape returns decoded value', (t) => {
  const payload = { unexpected: true, extra: [1, 2, 3] }
  setupHashWindow(`#state=${b64(JSON.stringify(payload))}`)
  const result = getUrlState<any>('state', 'hash', true)
  // parsing succeeds; shape validation is the caller's job
  t.deepEqual(result, payload)
})

// --- undefined / missing key ---

test('getUrlState: missing key in hash returns empty object when obj=true', (t) => {
  setupHashWindow('#other=foo')
  const result = getUrlState('state', 'hash', true)
  t.deepEqual(result, {})
})

test('getUrlState: missing key in search returns empty object when obj=true', (t) => {
  setupSearchWindow('?other=foo')
  const result = getUrlState('state', 'search', true)
  t.deepEqual(result, {})
})

// --- obj=false (raw string) path ---

test('getUrlState: returns raw string value from hash when obj=false', (t) => {
  setupHashWindow('#tab=overview')
  const result = getUrlState<string>('tab', 'hash', false)
  t.is(result, 'overview')
})

test('getUrlState: returns null-like for missing key in search when obj=false', (t) => {
  setupSearchWindow('?other=foo')
  const result = getUrlState<string | undefined>('missing', 'search', false)
  // URL.searchParams.get returns null for missing keys; the function returns it as-is
  t.falsy(result)
})
