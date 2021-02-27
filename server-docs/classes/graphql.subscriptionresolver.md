[did-server](../README.md) / [graphql](../modules/graphql.md) / SubscriptionResolver

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

\+ **new SubscriptionResolver**(`_mongo`: [*MongoService*](services.mongoservice.md)): [*SubscriptionResolver*](graphql.subscriptionresolver.md)

Constructor for SubscriptionResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*SubscriptionResolver*](graphql.subscriptionresolver.md)

Defined in: [server/graphql/resolvers/subscription/index.ts:14](https://github.com/Puzzlepart/did/blob/f23caba1/server/graphql/resolvers/subscription/index.ts#L14)

## Methods

### subscription

▸ **subscription**(`ctx`: [*Context*](graphql_context.context.md)): *Promise*<Subscription\>

Get current subscription

#### Parameters:

Name | Type |
:------ | :------ |
`ctx` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<Subscription\>

Defined in: [server/graphql/resolvers/subscription/index.ts:30](https://github.com/Puzzlepart/did/blob/f23caba1/server/graphql/resolvers/subscription/index.ts#L30)

___

### updateSubscription

▸ **updateSubscription**(`settings`: *SubscriptionSettingsInput*): *Promise*<BaseResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | *SubscriptionSettingsInput* | Settings    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/subscription/index.ts:41](https://github.com/Puzzlepart/did/blob/f23caba1/server/graphql/resolvers/subscription/index.ts#L41)
