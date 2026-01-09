import test from 'ava'
import { getCallbackUrl } from './getCallbackUrl'

// Mock Request for testing
class MockRequest {
  public protocol: string
  public session: any = {}
  private headers: Map<string, string> = new Map()

  constructor(protocol = 'http') {
    this.protocol = protocol
  }

  get(name: string): string | undefined {
    return this.headers.get(name.toLowerCase())
  }

  setHeader(name: string, value: string): void {
    this.headers.set(name.toLowerCase(), value)
  }
}

// Setup and teardown
test.beforeEach((t) => {
  t.context.originalEnv = { ...process.env }
})

test.afterEach((t) => {
  process.env = t.context.originalEnv
})

// Happy path: using stored session data
test('getCallbackUrl: uses stored session protocol and host', (t) => {
  const req = new MockRequest() as any
  req.session = {
    __originalProtocol: 'https',
    __originalHost: 'did.example.com'
  }
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'https://did.example.com/auth/callback')
})

test('getCallbackUrl: prioritizes session data over current request', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'localhost:9001')
  req.session = {
    __originalProtocol: 'https',
    __originalHost: 'production.com'
  }
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  // Should use session data, not current request
  t.is(result, 'https://production.com/auth/callback')
})

// Happy path: constructing from current request
test('getCallbackUrl: constructs from current request protocol and host', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'https://app.example.com/auth/callback')
})

test('getCallbackUrl: handles http protocol', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'localhost:9001')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'http://localhost:9001/auth/callback')
})

test('getCallbackUrl: handles https protocol', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'secure.example.com')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'https://secure.example.com/auth/callback')
})

// Happy path: different callback paths
test('getCallbackUrl: handles Azure AD callback path', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/auth/azuread-openidconnect/callback', 'MICROSOFT_REDIRECT_URI')
  t.is(result, 'https://app.example.com/auth/azuread-openidconnect/callback')
})

test('getCallbackUrl: handles Google callback path', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/auth/google/callback', 'GOOGLE_REDIRECT_URI')
  t.is(result, 'https://app.example.com/auth/google/callback')
})

test('getCallbackUrl: handles custom callback path', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/oauth/return', 'OAUTH_REDIRECT_URI')
  t.is(result, 'https://app.example.com/oauth/return')
})

// Edge case: environment variable fallback
test('getCallbackUrl: falls back to environment variable when no request data', (t) => {
  process.env.CUSTOM_REDIRECT = 'https://env.example.com/auth/callback'
  const req = new MockRequest() as any
  // No host header, no session data
  
  const result = getCallbackUrl(req, '/auth/callback', 'CUSTOM_REDIRECT')
  t.is(result, 'https://env.example.com/auth/callback')
})

test('getCallbackUrl: environment variable provides complete URL', (t) => {
  process.env.FULL_URL = 'https://complete.example.com/oauth/return'
  const req = new MockRequest() as any
  
  const result = getCallbackUrl(req, '/different/path', 'FULL_URL')
  // Environment variable is used as-is, path parameter is ignored
  t.is(result, 'https://complete.example.com/oauth/return')
})

// Edge case: last resort localhost fallback
test('getCallbackUrl: falls back to localhost when no data available', (t) => {
  delete process.env.ANY_VAR
  const req = new MockRequest() as any
  // No session, no host, no env var
  
  const result = getCallbackUrl(req, '/auth/callback', 'NONEXISTENT_VAR')
  t.is(result, 'http://localhost:9001/auth/callback')
})

test('getCallbackUrl: localhost fallback uses provided path', (t) => {
  delete process.env.ANY_VAR
  const req = new MockRequest() as any
  
  const result = getCallbackUrl(req, '/custom/path', 'NONEXISTENT_VAR')
  t.is(result, 'http://localhost:9001/custom/path')
})

// Edge case: ports in host
test('getCallbackUrl: preserves port in host header', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'localhost:3000')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'http://localhost:3000/auth/callback')
})

test('getCallbackUrl: handles non-standard port', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com:8443')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'https://app.example.com:8443/auth/callback')
})

// Edge case: X-Forwarded headers (Cloudflare, reverse proxy)
test('getCallbackUrl: host header works with reverse proxy', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'public.example.com')
  // In Express behind proxy, protocol and host should already be correct
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'https://public.example.com/auth/callback')
})

// Edge case: missing protocol
test('getCallbackUrl: handles missing protocol', (t) => {
  const req = {
    protocol: undefined,
    session: {},
    get: () => 'example.com'
  } as any
  
  process.env.FALLBACK_URL = 'https://fallback.com/callback'
  
  const result = getCallbackUrl(req, '/auth/callback', 'FALLBACK_URL')
  // No protocol, falls back to env var
  t.is(result, 'https://fallback.com/callback')
})

// Edge case: missing host
test('getCallbackUrl: handles missing host header', (t) => {
  const req = new MockRequest('https') as any
  // Don't set host header
  
  process.env.FALLBACK_URL = 'https://fallback.com/callback'
  
  const result = getCallbackUrl(req, '/auth/callback', 'FALLBACK_URL')
  // No host, falls back to env var
  t.is(result, 'https://fallback.com/callback')
})

// Edge case: null request
test('getCallbackUrl: handles null request', (t) => {
  process.env.NULL_TEST_URL = 'https://env.example.com/callback'
  
  const result = getCallbackUrl(null as any, '/auth/callback', 'NULL_TEST_URL')
  t.is(result, 'https://env.example.com/callback')
})

// Edge case: undefined request
test('getCallbackUrl: handles undefined request', (t) => {
  process.env.UNDEF_TEST_URL = 'https://env.example.com/callback'
  
  const result = getCallbackUrl(undefined as any, '/auth/callback', 'UNDEF_TEST_URL')
  t.is(result, 'https://env.example.com/callback')
})

// Edge case: path variations
test('getCallbackUrl: handles path without leading slash', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, 'auth/callback', 'TEST_ENV')
  t.is(result, 'https://app.example.com/auth/callback')
})

test('getCallbackUrl: handles path with query parameters', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/auth/callback?state=123', 'TEST_ENV')
  t.is(result, 'https://app.example.com/auth/callback?state=123')
})

test('getCallbackUrl: handles path with hash fragment', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/auth/callback#section', 'TEST_ENV')
  t.is(result, 'https://app.example.com/auth/callback#section')
})

test('getCallbackUrl: handles empty path', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '', 'TEST_ENV')
  t.is(result, 'https://app.example.com')
})

test('getCallbackUrl: handles root path', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'app.example.com')
  
  const result = getCallbackUrl(req, '/', 'TEST_ENV')
  t.is(result, 'https://app.example.com/')
})

// Edge case: domain variations
test('getCallbackUrl: handles subdomain', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'auth.app.example.com')
  
  const result = getCallbackUrl(req, '/callback', 'TEST_ENV')
  t.is(result, 'https://auth.app.example.com/callback')
})

test('getCallbackUrl: handles IPv4 address', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', '192.168.1.100:9001')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'http://192.168.1.100:9001/auth/callback')
})

test('getCallbackUrl: handles IPv6 address', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', '[::1]:9001')
  
  const result = getCallbackUrl(req, '/auth/callback', 'TEST_ENV')
  t.is(result, 'http://[::1]:9001/auth/callback')
})

// Real-world scenarios
test('getCallbackUrl: Cloudflare tunnel scenario', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'did-dev.craycon.no')
  
  const result = getCallbackUrl(req, '/auth/azuread-openidconnect/callback', 'MICROSOFT_REDIRECT_URI')
  t.is(result, 'https://did-dev.craycon.no/auth/azuread-openidconnect/callback')
})

test('getCallbackUrl: Azure App Service scenario', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'didapp.azurewebsites.net')
  
  const result = getCallbackUrl(req, '/auth/azuread-openidconnect/callback', 'MICROSOFT_REDIRECT_URI')
  t.is(result, 'https://didapp.azurewebsites.net/auth/azuread-openidconnect/callback')
})

test('getCallbackUrl: local development scenario', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'localhost:9001')
  
  const result = getCallbackUrl(req, '/auth/azuread-openidconnect/callback', 'MICROSOFT_REDIRECT_URI')
  t.is(result, 'http://localhost:9001/auth/azuread-openidconnect/callback')
})

// Edge case: session data variations
test('getCallbackUrl: handles partial session data - only protocol', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'example.com')
  req.session = {
    __originalProtocol: 'https'
    // No __originalHost
  }
  
  const result = getCallbackUrl(req, '/callback', 'TEST_ENV')
  // Should fall back to current request since session is incomplete
  t.is(result, 'http://example.com/callback')
})

test('getCallbackUrl: handles partial session data - only host', (t) => {
  const req = new MockRequest('http') as any
  req.setHeader('host', 'example.com')
  req.session = {
    __originalHost: 'stored.com'
    // No __originalProtocol
  }
  
  const result = getCallbackUrl(req, '/callback', 'TEST_ENV')
  // Should fall back to current request since session is incomplete
  t.is(result, 'http://example.com/callback')
})

test('getCallbackUrl: handles empty session object', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'example.com')
  req.session = {}
  
  const result = getCallbackUrl(req, '/callback', 'TEST_ENV')
  t.is(result, 'https://example.com/callback')
})

test('getCallbackUrl: handles null session', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'example.com')
  req.session = null
  
  const result = getCallbackUrl(req, '/callback', 'TEST_ENV')
  t.is(result, 'https://example.com/callback')
})

// Priority order verification
test('getCallbackUrl: priority order: session > request > env > localhost', (t) => {
  // Set up all sources
  process.env.ENV_URL = 'https://env.example.com/callback'
  
  const req = new MockRequest('http') as any
  req.setHeader('host', 'request.example.com')
  req.session = {
    __originalProtocol: 'https',
    __originalHost: 'session.example.com'
  }
  
  const result = getCallbackUrl(req, '/callback', 'ENV_URL')
  // Should use session (highest priority)
  t.is(result, 'https://session.example.com/callback')
})

// Idempotency
test('getCallbackUrl: produces consistent results', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'example.com')
  
  const result1 = getCallbackUrl(req, '/callback', 'TEST')
  const result2 = getCallbackUrl(req, '/callback', 'TEST')
  const result3 = getCallbackUrl(req, '/callback', 'TEST')
  
  t.is(result1, result2)
  t.is(result2, result3)
})

// Type safety
test('getCallbackUrl: always returns string', (t) => {
  const req = new MockRequest('https') as any
  req.setHeader('host', 'example.com')
  
  const result = getCallbackUrl(req, '/callback', 'TEST')
  t.is(typeof result, 'string')
})
