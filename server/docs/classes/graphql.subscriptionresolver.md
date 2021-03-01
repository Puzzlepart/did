[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / SubscriptionResolver

# Class: SubscriptionResolver

[graphql](../modules/graphql.md).SubscriptionResolver

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

Defined in: [server/graphql/resolvers/subscription/index.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/index.ts#L18)

## Methods

### subscription

▸ **subscription**(`context`: [*Context*](graphql_context.context.md)): *Promise*<[*Subscription*](graphql.subscription.md)\>

Get current subscription

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)\>

Defined in: [server/graphql/resolvers/subscription/index.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/index.ts#L34)

___

### updateSubscription

▸ **updateSubscription**(`settings`: [*SubscriptionSettingsInput*](graphql.subscriptionsettingsinput.md)): *Promise*<BaseResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | [*SubscriptionSettingsInput*](graphql.subscriptionsettingsinput.md) | Settings    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/subscription/index.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/index.ts#L45)
