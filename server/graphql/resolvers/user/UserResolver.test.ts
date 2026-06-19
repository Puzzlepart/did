import 'reflect-metadata'
import test from 'ava'
import { GraphQLError } from 'graphql'
import { authChecker as _authChecker } from '../../authChecker'

// AuthChecker is a union of function | class, which confuses strict TS.
// Cast to a plain callable so tests are readable without transpile-only.
const authChecker = _authChecker as (
  resolverData: any,
  roles: any[]
) => boolean | Promise<boolean>

// Mirrors the @Authorized<IAuthOptions>({ requiresUserContext: true })
// decorator applied to UserResolver.submitFeedback. If this literal drifts
// from the decorator, the guard intent drifts too - keep them in sync.
const feedbackAuthOptions = [{ requiresUserContext: true }]

function makeResolverData(userId?: string) {
  return {
    context: { permissions: [], userId },
    root: {},
    args: {},
    info: {} as any
  } as any
}

test('submitFeedback auth: rejects unauthenticated caller with UNAUTHENTICATED', (t) => {
  const err = t.throws(
    () => authChecker(makeResolverData(undefined), feedbackAuthOptions),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

test('submitFeedback auth: rejects caller with empty permissions and no userId', (t) => {
  const err = t.throws(
    () => authChecker(makeResolverData(undefined), feedbackAuthOptions),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
})

test('submitFeedback auth: passes when userId is present on context', (t) => {
  const result = authChecker(makeResolverData('user-123'), feedbackAuthOptions)
  t.true(result)
})
