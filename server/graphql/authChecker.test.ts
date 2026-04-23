import 'reflect-metadata'
import test from 'ava'
import { GraphQLError } from 'graphql'
import { authChecker as _authChecker } from './authChecker'
import { PermissionScope } from '../../shared/config/security/types'

// AuthChecker is a union of function | class, which confuses strict TS.
// Cast to a plain callable so tests are readable without transpile-only.
const authChecker = _authChecker as (
  resolverData: any,
  roles: any[]
) => boolean | Promise<boolean>

// Minimal ResolverData shape - authChecker only destructures `context`
function makeResolverData(permissions?: string[], userId?: string) {
  return {
    context: { permissions, userId },
    root: {},
    args: {},
    info: {} as any
  } as any
}

// --- bare @Authorized() (no options) ---

test('authChecker: anonymous request (no permissions) is rejected', (t) => {
  const err = t.throws(
    () => authChecker(makeResolverData(undefined), [undefined]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

test('authChecker: empty-permissions array is rejected (bare @Authorized)', (t) => {
  const err = t.throws(
    () => authChecker(makeResolverData([]), [undefined]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

// --- scoped @Authorized({ scope: X }) ---

test('authChecker: empty-permissions array is rejected on scoped @Authorized', (t) => {
  const err = t.throws(
    () =>
      authChecker(makeResolverData([]), [
        { scope: PermissionScope.ACCESS_TIMESHEET }
      ]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'FORBIDDEN')
})

test('authChecker: user with matching scope is accepted', (t) => {
  const result = authChecker(
    makeResolverData([PermissionScope.ACCESS_TIMESHEET]),
    [{ scope: PermissionScope.ACCESS_TIMESHEET }]
  )
  t.true(result)
})

test('authChecker: user with non-matching scope is rejected', (t) => {
  const err = t.throws(
    () =>
      authChecker(makeResolverData([PermissionScope.ACCESS_CUSTOMERS]), [
        { scope: PermissionScope.ACCESS_TIMESHEET }
      ]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'FORBIDDEN')
})

// --- requiresUserContext ---

test('authChecker: requiresUserContext rejected when no userId', (t) => {
  const err = t.throws(
    () =>
      authChecker(
        makeResolverData([PermissionScope.ACCESS_TIMESHEET], undefined),
        [{ requiresUserContext: true }]
      ),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

test('authChecker: requiresUserContext passes when userId is present', (t) => {
  const result = authChecker(
    makeResolverData([PermissionScope.ACCESS_TIMESHEET], 'user-123'),
    [{ requiresUserContext: true }]
  )
  t.true(result)
})

// --- API-token path parity ---
// An API token with empty permissions behaves the same as a session with [].
// The token source is irrelevant to authChecker - only context.permissions matters.

test('authChecker: API token with empty permissions rejected on bare @Authorized', (t) => {
  // Simulate a context built from token auth with no permissions granted
  const context = { permissions: [], tokenSource: 'api' as const }
  const err = t.throws(
    () => authChecker({ context } as any, [undefined]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

test('authChecker: API token with matching scope is accepted', (t) => {
  const context = {
    permissions: [PermissionScope.ACCESS_REPORTS],
    tokenSource: 'api' as const
  }
  const result = authChecker({ context } as any, [
    { scope: PermissionScope.ACCESS_REPORTS }
  ])
  t.true(result)
})

// --- bare @Authorized() with valid permissions ---

test('authChecker: user with non-empty permissions passes bare @Authorized', (t) => {
  const result = authChecker(
    makeResolverData([PermissionScope.ACCESS_TIMESHEET]),
    [undefined]
  )
  t.true(result)
})
