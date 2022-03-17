[did-server - v0.10.9](../README.md) / [Services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[Services](../modules/services.md).MSGraphService

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
- [getVacation](services.msgraphservice.md#getvacation)

## Constructors

### constructor

\+ **new MSGraphService**(`_msOAuthSvc`: [*MSOAuthService*](services.msoauthservice.md), `_accessToken?`: *string*, `context?`: *Context*): [*MSGraphService*](services.msgraphservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_msOAuthSvc` | [*MSOAuthService*](services.msoauthservice.md) |
`_accessToken?` | *string* |
`context?` | *Context* |

**Returns:** [*MSGraphService*](services.msgraphservice.md)

Defined in: [services/msgraph/index.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L30)

## Properties

### \_accessTokenOptions

• `Private` **\_accessTokenOptions**: MSAccessTokenOptions

Defined in: [services/msgraph/index.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L24)

___

### \_cache

• `Private` **\_cache**: [*CacheService*](services.cacheservice.md)= null

Defined in: [services/msgraph/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L23)

___

### context

• `Optional` `Readonly` **context**: *Context*

## Methods

### \_getClient

▸ `Private`**_getClient**(): *Promise*<Client\>

Gets a Microsoft Graph Client using the auth token from the class

**`memberof`** MSGraphService

**Returns:** *Promise*<Client\>

Defined in: [services/msgraph/index.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L45)

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

Defined in: [services/msgraph/index.ts:183](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L183)

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

Defined in: [services/msgraph/index.ts:126](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L126)

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

Defined in: [services/msgraph/index.ts:240](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L240)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**`memberof`** MSGraphService

**Returns:** *Promise*<any[]\>

Defined in: [services/msgraph/index.ts:213](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L213)

___

### getUserPhoto

▸ **getUserPhoto**(`size`: *string*): *Promise*<string\>

Get user photo in base64 format

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`size` | *string* | Photo size   |

**Returns:** *Promise*<string\>

A base64 representation of the user photo, or null if
the user photo is not found.

Defined in: [services/msgraph/index.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L68)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**`memberof`** MSGraphService

**Returns:** *Promise*<any\>

Defined in: [services/msgraph/index.ts:143](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L143)

___

### getVacation

▸ **getVacation**(`category`: *string*): *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Get vacation for the current user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category for vacation    |

**Returns:** *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Defined in: [services/msgraph/index.ts:86](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/index.ts#L86)
