import 'reflect-metadata'
import test from 'ava'
import { GraphQLError } from 'graphql'
import { PermissionScope } from '../../../../shared/config/security/types'
import { authChecker as _authChecker } from '../../authChecker'

// The `externalInvitations` query exposes the tenant's pending external-user
// invitations (names, emails, inviter). Read access must match the write
// access that `inviteExternalUser` / `cancelExternalInvitation` require,
// so the resolver is decorated with
// `@Authorized<IAuthOptions>({ scope: PermissionScope.INVITE_EXTERNAL_USERS })`.
//
// The decorator is enforced by the shared `authChecker`. These tests exercise
// the two branches via the checker with the exact options the resolver uses.

// AuthChecker is a union of function | class, which confuses strict TS.
// Cast to a plain callable so tests are readable without transpile-only.
const authChecker = _authChecker as (
  resolverData: any,
  roles: any[]
) => boolean | Promise<boolean>

const externalInvitationsAuthOptions = {
  scope: PermissionScope.INVITE_EXTERNAL_USERS
}

const makeResolverData = (permissions?: string[]) =>
  ({
    context: { permissions },
    root: {},
    args: {},
    info: {} as any
  }) as any

test('externalInvitations: caller with INVITE_EXTERNAL_USERS is accepted', (t) => {
  const result = authChecker(
    makeResolverData([PermissionScope.INVITE_EXTERNAL_USERS]),
    [externalInvitationsAuthOptions]
  )
  t.true(result)
})

test('externalInvitations: caller without INVITE_EXTERNAL_USERS is rejected with FORBIDDEN', (t) => {
  const err = t.throws(
    () =>
      authChecker(makeResolverData([PermissionScope.ACCESS_ADMIN]), [
        externalInvitationsAuthOptions
      ]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'FORBIDDEN')
})

test('externalInvitations: empty permissions rejected with FORBIDDEN', (t) => {
  const err = t.throws(
    () => authChecker(makeResolverData([]), [externalInvitationsAuthOptions]),
    { instanceOf: GraphQLError }
  )
  t.is((err as GraphQLError).extensions?.code, 'FORBIDDEN')
})
