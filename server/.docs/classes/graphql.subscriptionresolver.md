[did-server - v0.13.0](../README.md) / [GraphQL](../modules/graphql.md) / SubscriptionResolver

# Class: SubscriptionResolver

[GraphQL](../modules/graphql.md).SubscriptionResolver

Resolver for `Subscription`.

`SubscriptionService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.subscriptionresolver.md#constructor)

### Methods

- [subscription](graphql.subscriptionresolver.md#subscription)
- [updateSubscription](graphql.subscriptionresolver.md#updatesubscription)

## Constructors

### constructor

\+ **new SubscriptionResolver**(`_subscription`: [*SubscriptionService*](services.subscriptionservice.md)): [*SubscriptionResolver*](graphql.subscriptionresolver.md)

Constructor for SubscriptionResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_subscription` | [*SubscriptionService*](services.subscriptionservice.md) | Subscription service    |

**Returns:** [*SubscriptionResolver*](graphql.subscriptionresolver.md)

Defined in: [graphql/resolvers/subscription/SubscriptionResolver.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/SubscriptionResolver.ts#L25)

## Methods

### subscription

▸ **subscription**(`context`: [*Context*](graphql.context.md)): *Promise*<[*Subscription*](graphql.subscription.md)\>

Get current subscription

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql.context.md) |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)\>

Defined in: [graphql/resolvers/subscription/SubscriptionResolver.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/SubscriptionResolver.ts#L40)

___

### updateSubscription

▸ **updateSubscription**(`settings`: [*SubscriptionSettingsInput*](graphql.subscriptionsettingsinput.md)): *Promise*<BaseResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | [*SubscriptionSettingsInput*](graphql.subscriptionsettingsinput.md) | Settings    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/subscription/SubscriptionResolver.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/SubscriptionResolver.ts#L51)
