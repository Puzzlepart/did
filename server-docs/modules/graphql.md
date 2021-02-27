[did-server](../README.md) / graphql

# Module: graphql

## Table of contents

### Classes

- [ApiToken](../classes/graphql.apitoken.md)
- [ApiTokenInput](../classes/graphql.apitokeninput.md)
- [ApiTokenResolver](../classes/graphql.apitokenresolver.md)
- [BaseResult](../classes/graphql.baseresult.md)
- [CreateOrUpdateProjectResult](../classes/graphql.createorupdateprojectresult.md)
- [CreateOutlookCategoryResult](../classes/graphql.createoutlookcategoryresult.md)
- [Customer](../classes/graphql.customer.md)
- [CustomerInput](../classes/graphql.customerinput.md)
- [CustomerResolver](../classes/graphql.customerresolver.md)
- [Error](../classes/graphql.error.md)
- [EventError](../classes/graphql.eventerror.md)
- [EventInput](../classes/graphql.eventinput.md)
- [EventObject](../classes/graphql.eventobject.md)
- [LabelInput](../classes/graphql.labelinput.md)
- [LabelObject](../classes/graphql.labelobject.md)
- [LabelResolver](../classes/graphql.labelresolver.md)
- [Notification](../classes/graphql.notification.md)
- [NotificationResolver](../classes/graphql.notificationresolver.md)
- [NotificationTemplates](../classes/graphql.notificationtemplates.md)
- [OutlookCategory](../classes/graphql.outlookcategory.md)
- [OutlookCategoryResolver](../classes/graphql.outlookcategoryresolver.md)
- [Project](../classes/graphql.project.md)
- [ProjectInput](../classes/graphql.projectinput.md)
- [ProjectOptions](../classes/graphql.projectoptions.md)
- [ProjectResolver](../classes/graphql.projectresolver.md)
- [ReportsQuery](../classes/graphql.reportsquery.md)
- [ReportsResolver](../classes/graphql.reportsresolver.md)
- [Role](../classes/graphql.role.md)
- [RoleInput](../classes/graphql.roleinput.md)
- [RoleResolver](../classes/graphql.roleresolver.md)
- [Subscription](../classes/graphql.subscription.md)
- [SubscriptionADSyncSettings](../classes/graphql.subscriptionadsyncsettings.md)
- [SubscriptionADSyncSettingsInput](../classes/graphql.subscriptionadsyncsettingsinput.md)
- [SubscriptionForecastSettings](../classes/graphql.subscriptionforecastsettings.md)
- [SubscriptionForecastSettingsInput](../classes/graphql.subscriptionforecastsettingsinput.md)
- [SubscriptionResolver](../classes/graphql.subscriptionresolver.md)
- [SubscriptionSettings](../classes/graphql.subscriptionsettings.md)
- [SubscriptionSettingsInput](../classes/graphql.subscriptionsettingsinput.md)
- [TimeEntry](../classes/graphql.timeentry.md)
- [TimesheetOptions](../classes/graphql.timesheetoptions.md)
- [TimesheetPeriodInput](../classes/graphql.timesheetperiodinput.md)
- [TimesheetPeriodObject](../classes/graphql.timesheetperiodobject.md)
- [TimesheetQuery](../classes/graphql.timesheetquery.md)
- [TimesheetResolver](../classes/graphql.timesheetresolver.md)
- [User](../classes/graphql.user.md)
- [UserInput](../classes/graphql.userinput.md)
- [UserQuery](../classes/graphql.userquery.md)
- [UserQueryOptions](../classes/graphql.userqueryoptions.md)
- [UserResolver](../classes/graphql.userresolver.md)

### Interfaces

- [ICreateOrUpdateCustomerVariables](../interfaces/graphql.icreateorupdatecustomervariables.md)
- [ICustomersQueryVariables](../interfaces/graphql.icustomersqueryvariables.md)
- [IDeleteCustomerVariables](../interfaces/graphql.ideletecustomervariables.md)
- [INotificationTemplates](../interfaces/graphql.inotificationtemplates.md)
- [INotificationsQueryVariables](../interfaces/graphql.inotificationsqueryvariables.md)

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

Defined in: [server/graphql/index.ts:66](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/index.ts#L66)
