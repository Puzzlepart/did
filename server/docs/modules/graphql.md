[did-server - v0.10.0](../README.md) / graphql

# Module: graphql

## Table of contents

### Resolver Classes

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

### InputType Classes

- [ApiTokenInput](../classes/graphql.apitokeninput.md)
- [CustomerInput](../classes/graphql.customerinput.md)
- [EventInput](../classes/graphql.eventinput.md)
- [LabelInput](../classes/graphql.labelinput.md)
- [NotificationTemplates](../classes/graphql.notificationtemplates.md)
- [ProjectInput](../classes/graphql.projectinput.md)
- [ProjectOptions](../classes/graphql.projectoptions.md)
- [ReportsQuery](../classes/graphql.reportsquery.md)
- [RoleInput](../classes/graphql.roleinput.md)
- [SubscriptionADSyncSettingsInput](../classes/graphql.subscriptionadsyncsettingsinput.md)
- [SubscriptionForecastSettingsInput](../classes/graphql.subscriptionforecastsettingsinput.md)
- [SubscriptionSettingsInput](../classes/graphql.subscriptionsettingsinput.md)
- [TimesheetOptions](../classes/graphql.timesheetoptions.md)
- [TimesheetPeriodInput](../classes/graphql.timesheetperiodinput.md)
- [TimesheetQuery](../classes/graphql.timesheetquery.md)
- [UserInput](../classes/graphql.userinput.md)
- [UserQuery](../classes/graphql.userquery.md)
- [UserQueryOptions](../classes/graphql.userqueryoptions.md)

### ObjectType Classes

- [ApiToken](../classes/graphql.apitoken.md)
- [CreateOrUpdateProjectResult](../classes/graphql.createorupdateprojectresult.md)
- [CreateOutlookCategoryResult](../classes/graphql.createoutlookcategoryresult.md)
- [Customer](../classes/graphql.customer.md)
- [EventObject](../classes/graphql.eventobject.md)
- [LabelObject](../classes/graphql.labelobject.md)
- [Notification](../classes/graphql.notification.md)
- [OutlookCategory](../classes/graphql.outlookcategory.md)
- [Project](../classes/graphql.project.md)
- [Role](../classes/graphql.role.md)
- [Subscription](../classes/graphql.subscription.md)
- [SubscriptionADSyncSettings](../classes/graphql.subscriptionadsyncsettings.md)
- [SubscriptionForecastSettings](../classes/graphql.subscriptionforecastsettings.md)
- [SubscriptionSettings](../classes/graphql.subscriptionsettings.md)
- [TimeEntry](../classes/graphql.timeentry.md)
- [TimesheetPeriodObject](../classes/graphql.timesheetperiodobject.md)
- [User](../classes/graphql.user.md)

### Functions

- [generateClientInfo](graphql.md#generateclientinfo)
- [generateGraphQLSchema](graphql.md#generategraphqlschema)
- [setupGraphQL](graphql.md#setupgraphql)

## Functions

### generateClientInfo

▸ **generateClientInfo**(`__namedParameters`: *GraphQLRequestContext*<[*Context*](../classes/graphql_context.context.md)\>): *object*

Specify this function to provide Apollo Studio with client details
for each processed request. Apollo Studio uses this information to
segment metrics by client. This function is passed a GraphQLRequestContext
object containing all available information about the request. It should
return an object with clientName and clientVersion fields that i
dentify the associated client.

By default, the plugin attempts to obtain these values from the incoming
request's HTTP headers (specifically, apollographql-client-name and apollographql-client-version).

**`see`** https://www.apollographql.com/docs/apollo-server/api/plugin/usage-reporting/#generateclientinfo

**`remarks`** For now we're fetching browser info using ua-parser-js, aswell as checking
for Postman, Azure Logic Apps and Microsoft Flow.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *GraphQLRequestContext*<[*Context*](../classes/graphql_context.context.md)\> |

**Returns:** *object*

Name | Type |
:------ | :------ |
`clientName` | *string* |
`clientVersion` | *string* |

Defined in: [server/graphql/index.ts:89](https://github.com/Puzzlepart/did/blob/dev/server/graphql/index.ts#L89)

___

### generateGraphQLSchema

▸ `Const`**generateGraphQLSchema**(): *Promise*<GraphQLSchema\>

Generate GraphQL schema using type-graphql

* Setting up the schema to use Dependency injection (https://typegraphql.com/docs/dependency-injection.html)
* Turns of validation
* Sets auth checker
* Registers GraphQLDateTime scalar type

**`see`** https://typegraphql.com/

**Returns:** *Promise*<GraphQLSchema\>

Defined in: [server/graphql/index.ts:46](https://github.com/Puzzlepart/did/blob/dev/server/graphql/index.ts#L46)

___

### setupGraphQL

▸ `Const`**setupGraphQL**(`app`: *Application*, `client`: *MongoClient*): *Promise*<void\>

Set up GraphQL for the Express Application

* Sets up reporting to Apollo Studio
* Sets up plugin to reset the container for each request

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`app` | *Application* | Express application   |
`client` | *MongoClient* | Mongo client    |

**Returns:** *Promise*<void\>

Defined in: [server/graphql/index.ts:122](https://github.com/Puzzlepart/did/blob/dev/server/graphql/index.ts#L122)
