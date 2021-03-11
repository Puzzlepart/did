[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[services](../modules/services.md).MSGraphService

## Table of contents

### Constructors

- [constructor](services.msgraphservice.md#constructor)

### Properties

- [\_accessTokenOptions](services.msgraphservice.md#_accesstokenoptions)
- [\_cache](services.msgraphservice.md#_cache)
- [context](services.msgraphservice.md#context)

### Methods

- [\_getClient](services.msgraphservice.md#_getclient)
- [createOutlookCategory](services.msgraphservice.md#createoutlookcategory)
- [getCurrentUser](services.msgraphservice.md#getcurrentuser)
- [getEvents](services.msgraphservice.md#getevents)
- [getOutlookCategories](services.msgraphservice.md#getoutlookcategories)
- [getUsers](services.msgraphservice.md#getusers)

## Constructors

### constructor

\+ **new MSGraphService**(`_oauthService`: [*default*](services_oauth.default.md), `_access_token?`: *string*, `context?`: [*Context*](graphql_context.context.md)): [*MSGraphService*](services.msgraphservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_oauthService` | [*default*](services_oauth.default.md) |
`_access_token?` | *string* |
`context?` | [*Context*](graphql_context.context.md) |

**Returns:** [*MSGraphService*](services.msgraphservice.md)

Defined in: [server/services/msgraph/index.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L27)

## Properties

### \_accessTokenOptions

• `Private` **\_accessTokenOptions**: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)

Defined in: [server/services/msgraph/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L21)

___

### \_cache

• `Private` **\_cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/msgraph/index.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L20)

___

### context

• `Optional` `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_getClient

▸ `Private`**_getClient**(): *Promise*<Client\>

Gets a Microsoft Graph Client using the auth token from the class

**Returns:** *Promise*<Client\>

Defined in: [server/services/msgraph/index.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L40)

___

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<MSGraphOutlookCategory\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<MSGraphOutlookCategory\>

Defined in: [server/services/msgraph/index.ts:111](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L111)

___

### getCurrentUser

▸ **getCurrentUser**(`properties`: *string*[]): *Promise*<any\>

Get current user properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`properties` | *string*[] | Properties to retrieve    |

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L59)

___

### getEvents

▸ **getEvents**(`startDate`: *string*, `endDate`: *string*, `options`: MSGraphEventOptions): *Promise*<default[]\>

Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate` | *string* | Start date (YYYY-MM-DD)   |
`endDate` | *string* | End date (YYYY-MM-DD)   |
`options` | MSGraphEventOptions | Options    |

**Returns:** *Promise*<default[]\>

Defined in: [server/services/msgraph/index.ts:161](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L161)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [server/services/msgraph/index.ts:137](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L137)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L75)
