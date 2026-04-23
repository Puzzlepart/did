import test from 'ava'

/**
 * Unit tests for RequestContext.create - subscription refresh logic.
 *
 * Uses a mocked MongoClient so no real Mongo connection is needed.
 * The three cases exercised:
 *   1. Valid subscriptionId - findOne returns a fresh doc, context gets it.
 *   2. findOne returns null  - falls back to the session copy.
 *   3. findOne throws        - falls back to the session copy.
 */

// Set required env vars before importing the module under test
process.env.MONGO_DB_DB_NAME = 'test-db'
process.env.API_TOKEN_SECRET = 'test-secret'

// We need reflect-metadata before any type-graphql decorator runs
import 'reflect-metadata'
import { RequestContext } from './requestContext'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(subscriptionId: string | null) {
  return {
    user: {
      id: 'user-1',
      subscription: subscriptionId
        ? { id: subscriptionId, db: 'tenant-db', _id: subscriptionId }
        : undefined,
      role: { name: 'user', permissions: ['read'] },
      provider: 'azuread-openidconnect',
      configuration: null
    }
  } as any
}

function makeMcl(findOneImpl: () => Promise<any>) {
  // Minimal MongoClient mock: db() returns a collection stub
  const collection = {
    findOne: findOneImpl
  }
  const db = {
    collection: () => collection
  }
  return {
    db: () => db
  } as any
}

// ---------------------------------------------------------------------------
// Test 1: fresh doc returned from DB
// ---------------------------------------------------------------------------

test('requestContext: session branch fetches fresh subscription from DB', async (t) => {
  const freshDoc = {
    _id: 'sub-1',
    db: 'tenant-db',
    settings: { feature: { newFlag: true } }
  }

  let findOneCalled = false
  const mcl = makeMcl(async () => {
    findOneCalled = true
    return freshDoc
  })

  const request = makeRequest('sub-1')
  const context = await RequestContext.create(request, mcl)

  t.true(findOneCalled, 'findOne should have been called')
  t.is(
    (context.subscription as any).settings?.feature?.newFlag,
    true,
    'context.subscription should reflect the fresh document'
  )
  t.is(
    (context.subscription as any).id,
    'sub-1',
    'id field should be set from _id'
  )
})

// ---------------------------------------------------------------------------
// Test 2: findOne returns null - fall back to session copy
// ---------------------------------------------------------------------------

test('requestContext: falls back to session subscription when findOne returns null', async (t) => {
  const mcl = makeMcl(async () => null)

  const request = makeRequest('sub-2')
  const sessionCopy = request.user.subscription

  const context = await RequestContext.create(request, mcl)

  t.is(
    context.subscription,
    sessionCopy,
    'context.subscription should be the session copy when DB returns null'
  )
})

// ---------------------------------------------------------------------------
// Test 3: findOne throws - fall back to session copy, no 500
// ---------------------------------------------------------------------------

test('requestContext: falls back to session subscription when findOne throws', async (t) => {
  const mcl = makeMcl(async () => {
    throw new Error('Mongo outage')
  })

  const request = makeRequest('sub-3')
  const sessionCopy = request.user.subscription

  // Must not throw
  let context: RequestContext | undefined
  await t.notThrowsAsync(async () => {
    context = await RequestContext.create(request, mcl)
  }, 'RequestContext.create should not throw when findOne throws')

  t.is(
    context?.subscription,
    sessionCopy,
    'context.subscription should be the session copy on Mongo error'
  )
})

// ---------------------------------------------------------------------------
// Test 4: no subscriptionId in session - subscription stays as session default
// ---------------------------------------------------------------------------

test('requestContext: no subscriptionId skips DB lookup and uses empty default', async (t) => {
  let subscriptionFindCalled = false
  // Track which collection is queried so we can tell subscriptions apart
  const db = {
    collection: (name: string) => ({
      findOne: async () => {
        if (name === 'subscriptions') subscriptionFindCalled = true
        return null
      }
    })
  }
  const mcl = { db: () => db } as any

  // Omit the subscription key entirely (as would happen for unauthenticated/no-sub users)
  const request = {
    user: {
      id: 'user-no-sub',
      role: { name: 'user', permissions: ['read'] },
      provider: 'azuread-openidconnect',
      configuration: null
    }
  } as any

  const context = await RequestContext.create(request, mcl)

  t.false(
    subscriptionFindCalled,
    'subscriptions.findOne should not be called when session has no subscriptionId'
  )
  t.falsy(
    (context.subscription as any)?.id,
    'subscription id should be absent when session has no subscription'
  )
})
