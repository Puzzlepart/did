[did-server - v0.13.0](../README.md) / [GraphQL](../modules/graphql.md) / SubscriptionVacationSettings

# Class: SubscriptionVacationSettings

[GraphQL](../modules/graphql.md).SubscriptionVacationSettings

## Table of contents

### Constructors

- [constructor](graphql.subscriptionvacationsettings.md#constructor)

### Properties

- [calculationType](graphql.subscriptionvacationsettings.md#calculationtype)
- [eventCategory](graphql.subscriptionvacationsettings.md#eventcategory)
- [totalDays](graphql.subscriptionvacationsettings.md#totaldays)

## Constructors

### constructor

\+ **new SubscriptionVacationSettings**(): [*SubscriptionVacationSettings*](graphql.subscriptionvacationsettings.md)

**Returns:** [*SubscriptionVacationSettings*](graphql.subscriptionvacationsettings.md)

## Properties

### calculationType

• `Optional` **calculationType**: *string*

Vacation calculation type (`planned` or `actual`)

Defined in: [graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts#L22)

___

### eventCategory

• `Optional` **eventCategory**: *string*

Event category to use for vacation events

Defined in: [graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts#L28)

___

### totalDays

• `Optional` **totalDays**: *number*

Total number of vacation days per year

Defined in: [graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/subscription/types/SubscriptionVacationSettings.ts#L16)
