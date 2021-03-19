[did-server - v0.9.11](../README.md) / [services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[services](../modules/services.md).MSGraphService

Microsoft Graph service

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
- [getUserPhoto](services.msgraphservice.md#getuserphoto)
- [getUsers](services.msgraphservice.md#getusers)

## Constructors

### constructor

\+ **new MSGraphService**(`_oauthService`: [*TokenService*](services.tokenservice.md), `_access_token?`: *string*, `context?`: *Context*): [*MSGraphService*](services.msgraphservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_oauthService` | [*TokenService*](services.tokenservice.md) |
`_access_token?` | *string* |
`context?` | *Context* |

**Returns:** [*MSGraphService*](services.msgraphservice.md)

Defined in: [services/msgraph/index.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L29)

## Properties

### \_accessTokenOptions

• `Private` **\_accessTokenOptions**: AccessTokenOptions

Defined in: [services/msgraph/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L23)

___

### \_cache

• `Private` **\_cache**: [*CacheService*](services.cacheservice.md)= null

Defined in: [services/msgraph/index.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L22)

___

### context

• `Optional` `Readonly` **context**: *Context*

## Methods

### \_getClient

▸ `Private`**_getClient**(): *Promise*<Client\>

Gets a Microsoft Graph Client using the auth token from the class

**`memberof`** MSGraphService

**Returns:** *Promise*<Client\>

Defined in: [services/msgraph/index.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L44)

___

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<MSGraphOutlookCategory\>

Create Outlook category

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<MSGraphOutlookCategory\>

Defined in: [services/msgraph/index.ts:146](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L146)

___

### getCurrentUser

▸ **getCurrentUser**(`properties`: *string*[]): *Promise*<any\>

Get current user properties

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`properties` | *string*[] | Properties to retrieve    |

**Returns:** *Promise*<any\>

Defined in: [services/msgraph/index.ts:89](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L89)

___

### getEvents

▸ **getEvents**(`startDateTimeIso`: *string*, `endDateTimeIso`: *string*): *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDateTimeIso` | *string* | Start date time in `ISO format`   |
`endDateTimeIso` | *string* | End date time in `ISO format`    |

**Returns:** *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Defined in: [services/msgraph/index.ts:203](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L203)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**`memberof`** MSGraphService

**Returns:** *Promise*<any[]\>

Defined in: [services/msgraph/index.ts:176](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L176)

___

### getUserPhoto

▸ **getUserPhoto**(`size`: *string*): *Promise*<string\>

Get user photo in base64 format

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`size` | *string* | Photo size    |

**Returns:** *Promise*<string\>

A base64 representation of the user photo

Defined in: [services/msgraph/index.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L67)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**`memberof`** MSGraphService

**Returns:** *Promise*<any\>

Defined in: [services/msgraph/index.ts:106](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L106)
