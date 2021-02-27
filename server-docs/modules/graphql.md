[did-server](../README.md) / graphql

# Module: graphql

## Table of contents

### Classes

- [ApiTokenResolver](../classes/graphql.apitokenresolver.md)
- [CustomerResolver](../classes/graphql.customerresolver.md)
- [LabelResolver](../classes/graphql.labelresolver.md)
- [NotificationResolver](../classes/graphql.notificationresolver.md)
- [OutlookCategoryResolver](../classes/graphql.outlookcategoryresolver.md)
- [ProjectResolver](../classes/graphql.projectresolver.md)
- [ReportsResolver](../classes/graphql.reportsresolver.md)
- [RoleResolver](../classes/graphql.roleresolver.md)
- [SubscriptionResolver](../classes/graphql.subscriptionresolver.md)
- [TimesheetResolver](../classes/graphql.timesheetresolver.md)
- [UserResolver](../classes/graphql.userresolver.md)

### Functions

- [setupGraphQL](graphql.md#setupgraphql)

## Functions

### setupGraphQL

▸ `Const`**setupGraphQL**(`app`: *Application*, `client`: *MongoClient*): *Promise*<void\>

Set up GraphQL for the Express Application

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`app` | *Application* | Express application   |
`client` | *MongoClient* | Mongo client    |

**Returns:** *Promise*<void\>

Defined in: [server/graphql/index.ts:66](https://github.com/Puzzlepart/did/blob/aeee6e68/server/graphql/index.ts#L66)
