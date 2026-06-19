import test from 'ava'
import 'reflect-metadata'

/**
 * Unit tests for `checkSecurityGroupMembership`.
 *
 * Verifies the decoupled guard between the security-group toggle and the
 * domain-restriction toggle. The Graph service is stubbed via
 * `require.cache` so the branch decisions can be isolated without hitting
 * Microsoft Graph. The stub also exposes a call counter so tests can assert
 * that short-circuit branches never reach the network path.
 */

// ---------------------------------------------------------------------------
// Stub `MSGraphService` / `MSOAuthService` before loading module under test
// ---------------------------------------------------------------------------

type StubState = {
  graphCalls: number
  nextReturn: boolean
  shouldThrow: boolean
}

const stubState: StubState = {
  graphCalls: 0,
  nextReturn: true,
  shouldThrow: false
}

function resetStub(next = true, shouldThrow = false) {
  stubState.graphCalls = 0
  stubState.nextReturn = next
  stubState.shouldThrow = shouldThrow
}

class MSOAuthServiceStub {
  constructor(_options: unknown) {
    // no-op
  }
}

class MSGraphServiceStub {
  constructor(_auth: unknown) {
    // no-op
  }
  async isUserMemberOfSecurityGroup(_groupId: string, _mail: string) {
    stubState.graphCalls++
    if (stubState.shouldThrow) {
      throw new Error('Graph should not have been called')
    }
    return stubState.nextReturn
  }
}

const servicesPath = require.resolve('../../../services')
require.cache[servicesPath] = {
  id: servicesPath,
  filename: servicesPath,
  loaded: true,
  exports: {
    MSGraphService: MSGraphServiceStub,
    MSOAuthService: MSOAuthServiceStub
  }
} as unknown as NodeJS.Module

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { checkSecurityGroupMembership } = require('./checkSecurityGroupMembership') as {
  checkSecurityGroupMembership: (
    settings: Record<string, unknown>,
    tokenParameters: unknown,
    mail: string
  ) => Promise<boolean>
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.serial('returns false without calling Graph when securityGroupEnabled is false', async (t) => {
  resetStub(true, true)
  const result = await checkSecurityGroupMembership(
    {
      securityGroupEnabled: false,
      securityGroupId: 'group-1',
      domainRestrictionEnabled: true,
      domainRestriction: 'contoso.com'
    },
    {},
    'user@contoso.com'
  )
  t.false(result)
  t.is(stubState.graphCalls, 0)
})

test.serial('returns false without calling Graph when securityGroupId is empty', async (t) => {
  resetStub(true, true)
  const result = await checkSecurityGroupMembership(
    {
      securityGroupEnabled: true,
      securityGroupId: '',
      domainRestrictionEnabled: true,
      domainRestriction: 'contoso.com'
    },
    {},
    'user@contoso.com'
  )
  t.false(result)
  t.is(stubState.graphCalls, 0)
})

test.serial('calls Graph when securityGroup is enabled and domainRestriction is disabled, regardless of mail domain', async (t) => {
  resetStub(true)
  const result = await checkSecurityGroupMembership(
    {
      securityGroupEnabled: true,
      securityGroupId: 'group-1',
      domainRestrictionEnabled: false,
      domainRestriction: 'contoso.com'
    },
    {},
    'user@fabrikam.com'
  )
  t.true(result)
  t.is(stubState.graphCalls, 1)
})

test.serial('returns false without calling Graph when domain restriction is enabled and mail is outside the domain', async (t) => {
  resetStub(true, true)
  const result = await checkSecurityGroupMembership(
    {
      securityGroupEnabled: true,
      securityGroupId: 'group-1',
      domainRestrictionEnabled: true,
      domainRestriction: 'contoso.com'
    },
    {},
    'user@fabrikam.com'
  )
  t.false(result)
  t.is(stubState.graphCalls, 0)
})

test.serial('calls Graph when domain restriction is enabled and mail is inside the domain', async (t) => {
  resetStub(true)
  const result = await checkSecurityGroupMembership(
    {
      securityGroupEnabled: true,
      securityGroupId: 'group-1',
      domainRestrictionEnabled: true,
      domainRestriction: 'contoso.com'
    },
    {},
    'user@contoso.com'
  )
  t.true(result)
  t.is(stubState.graphCalls, 1)
})
