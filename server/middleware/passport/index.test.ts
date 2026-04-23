/// <reference path="../../global.d.ts" />
import test from 'ava'
import { pickSessionFields } from './index'

// --- pickSessionFields ---

test('pickSessionFields: keeps id, mail, provider', (t) => {
  const result = pickSessionFields({
    id: 'u1',
    mail: 'user@example.com',
    provider: 'microsoft'
  })
  t.is(result.id, 'u1')
  t.is(result.mail, 'user@example.com')
  t.is(result.provider, 'microsoft')
})

test('pickSessionFields: keeps role with name and permissions', (t) => {
  const role = { name: 'Owner', permissions: ['READ', 'WRITE'] }
  const result = pickSessionFields({ role })
  t.deepEqual(result.role, role)
})

test('pickSessionFields: keeps subscription for tenant routing', (t) => {
  const subscription = { id: 'sub1', name: 'Acme', db: 'acme_db', settings: {} }
  const result = pickSessionFields({ subscription })
  t.deepEqual(result.subscription, subscription)
})

test('pickSessionFields: keeps configuration', (t) => {
  const result = pickSessionFields({ configuration: 'some-config' })
  t.is(result.configuration, 'some-config')
})

test('pickSessionFields: keeps tokenParams for OAuth refresh', (t) => {
  const tokenParams = { access_token: 'tok', refresh_token: 'rtok', expires_in: 3600 }
  const result = pickSessionFields({ tokenParams })
  t.deepEqual(result.tokenParams, tokenParams)
})

test('pickSessionFields: drops givenName', (t) => {
  const result = pickSessionFields({ givenName: 'Alice', id: 'u1' }) as any
  t.is(result.givenName, undefined)
})

test('pickSessionFields: drops surname', (t) => {
  const result = pickSessionFields({ surname: 'Smith', id: 'u1' }) as any
  t.is(result.surname, undefined)
})

test('pickSessionFields: drops jobTitle', (t) => {
  const result = pickSessionFields({ jobTitle: 'Engineer', id: 'u1' }) as any
  t.is(result.jobTitle, undefined)
})

test('pickSessionFields: drops mobilePhone', (t) => {
  const result = pickSessionFields({ mobilePhone: '+47 123', id: 'u1' }) as any
  t.is(result.mobilePhone, undefined)
})

test('pickSessionFields: drops preferredLanguage', (t) => {
  const result = pickSessionFields({ preferredLanguage: 'en-GB', id: 'u1' }) as any
  t.is(result.preferredLanguage, undefined)
})

test('pickSessionFields: drops displayName', (t) => {
  const result = pickSessionFields({ displayName: 'Alice Smith', id: 'u1' }) as any
  t.is(result.displayName, undefined)
})

test('pickSessionFields: drops arbitrary extra fields', (t) => {
  const result = pickSessionFields({
    id: 'u1',
    secretField: 'should-not-be-in-session',
    anotherExtra: 42
  }) as any
  t.is(result.secretField, undefined)
  t.is(result.anotherExtra, undefined)
})

test('pickSessionFields: handles empty input', (t) => {
  const result = pickSessionFields({})
  t.is(result.id, undefined)
  t.is(result.mail, undefined)
  t.is(result.provider, undefined)
  t.is(result.role, undefined)
  t.is(result.subscription, undefined)
  t.is(result.configuration, undefined)
  t.is(result.tokenParams, undefined)
})

test('pickSessionFields: output has exactly 7 keys when all provided', (t) => {
  const result = pickSessionFields({
    id: 'u1',
    mail: 'user@example.com',
    provider: 'microsoft',
    role: { name: 'User' },
    subscription: { id: 's1', name: 'Acme' },
    configuration: {},
    tokenParams: {},
    // extras that should be dropped
    givenName: 'Alice',
    surname: 'Smith',
    jobTitle: 'Engineer'
  })
  const keys = Object.keys(result).filter((k) => result[k as keyof typeof result] !== undefined)
  t.is(keys.length, 7)
})

test('pickSessionFields: google provider is preserved', (t) => {
  const result = pickSessionFields({
    id: 'google-id',
    mail: 'user@gmail.com',
    provider: 'google',
    tokenParams: { access_token: 'gtok', refresh_token: 'grtok' }
  })
  t.is(result.provider, 'google')
  t.deepEqual(result.tokenParams, { access_token: 'gtok', refresh_token: 'grtok' })
})
