import test from 'ava'
import { MSGraphService } from './MSGraphService'

/**
 * Tests for `MSGraphService.isUserMemberOfSecurityGroup`.
 *
 * The Graph client is stubbed at the `_getClient` boundary so we can
 * assert on the request path and method invoked on the fluent API.
 */

type ApiCall = {
  path: string
  method: 'get' | 'post'
  body?: any
}

function createServiceWithStub(options: {
  postResponse?: any
  postError?: Error
}) {
  const calls: ApiCall[] = []

  const api = (path: string) => ({
    get: async () => {
      calls.push({ path, method: 'get' })
      return { value: [] }
    },
    post: async (body: any) => {
      calls.push({ path, method: 'post', body })
      if (options.postError) throw options.postError
      return options.postResponse
    }
  })

  const fakeClient = { api }

  const service = new MSGraphService(
    { getAccessToken: async () => ({ access_token: 'fake' }) } as any,
    'fake-token',
    {} as any
  )
  // Override the private client resolver to avoid real OAuth.
  ;(service as any)._getClient = async () => fakeClient

  return { service, calls }
}

test('isUserMemberOfSecurityGroup returns true when Graph reports membership', async (t) => {
  const { service, calls } = createServiceWithStub({
    postResponse: { value: ['group-1'] }
  })

  const result = await service.isUserMemberOfSecurityGroup(
    'group-1',
    'user@example.com'
  )

  t.true(result)
  t.is(calls.length, 1)
  t.is(calls[0].method, 'post')
  t.is(calls[0].path, '/users/user%40example.com/checkMemberGroups')
  t.deepEqual(calls[0].body, { groupIds: ['group-1'] })
})

test('isUserMemberOfSecurityGroup returns false when Graph reports no membership', async (t) => {
  const { service } = createServiceWithStub({
    postResponse: { value: [] }
  })

  const result = await service.isUserMemberOfSecurityGroup(
    'group-1',
    'user@example.com'
  )

  t.false(result)
})

test('isUserMemberOfSecurityGroup returns false when Graph throws', async (t) => {
  const { service } = createServiceWithStub({
    postError: new Error('Graph exploded')
  })

  const result = await service.isUserMemberOfSecurityGroup(
    'group-1',
    'user@example.com'
  )

  t.false(result)
})

test('isUserMemberOfSecurityGroup URL-encodes mail addresses with unsafe characters', async (t) => {
  const { service, calls } = createServiceWithStub({
    postResponse: { value: ['group-1'] }
  })

  const result = await service.isUserMemberOfSecurityGroup(
    'group-1',
    'user+tag@example.com'
  )

  t.true(result)
  t.is(calls[0].path, '/users/user%2Btag%40example.com/checkMemberGroups')
})
