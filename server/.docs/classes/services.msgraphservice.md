[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / MSGraphService

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

\+ **new MSGraphService**(`_msOAuthSvc`: [*MSOAuthService*](services.msoauthservice.md), `_accessToken?`: *string*, `context?`: [*Context*](graphql.context.md)): [*MSGraphService*](services.msgraphservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_msOAuthSvc` | [*MSOAuthService*](services.msoauthservice.md) |
`_accessToken?` | *string* |
`context?` | [*Context*](graphql.context.md) |

**Returns:** [*MSGraphService*](services.msgraphservice.md)

Defined in: [services/msgraph/MSGraphService.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L30)

## Properties

### \_accessTokenOptions

• `Private` **\_accessTokenOptions**: MSAccessTokenOptions

Defined in: [services/msgraph/MSGraphService.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L24)

___

### \_cache

• `Private` **\_cache**: [*CacheService*](services.cacheservice.md)= null

Defined in: [services/msgraph/MSGraphService.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L23)

___

### context

• `Optional` `Readonly` **context**: [*Context*](graphql.context.md)

## Methods

### \_getClient

▸ `Private`**_getClient**(): *Promise*<Client\>

Gets a Microsoft Graph Client using the auth token from the class

**`memberof`** MSGraphService

**Returns:** *Promise*<Client\>

Defined in: [services/msgraph/MSGraphService.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L45)

___

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<[*MSGraphOutlookCategory*](../interfaces/services.msgraphoutlookcategory.md)\>

Create Outlook category.

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<[*MSGraphOutlookCategory*](../interfaces/services.msgraphoutlookcategory.md)\>

Defined in: [services/msgraph/MSGraphService.ts:185](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L185)

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

Defined in: [services/msgraph/MSGraphService.ts:128](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L128)

___

### getEvents

▸ **getEvents**(`startDateTimeIso`: *string*, `endDateTimeIso`: *string*, `filterString?`: *string*, `orderBy?`: *string*): *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`startDateTimeIso` | *string* | - | Start date time in `ISO format`   |
`endDateTimeIso` | *string* | - | End date time in `ISO format`   |
`filterString` | *string* | "sensitivity ne 'private' and isallday eq false and iscancelled eq false" | Filter string for the query (default: `sensitivity ne 'private' and isallday eq false and iscancelled eq false`)   |
`orderBy` | *string* | 'start/dateTime asc' | Order by string for the query (default: `start/dateTime asc`)    |

**Returns:** *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Defined in: [services/msgraph/MSGraphService.ts:252](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L252)

___

### getOutlookCategories

▸ **getOutlookCategories**(`cacheExpiry?`: *number*): *Promise*<any[]\>

Get Outlook categories. This method uses the Microsoft Graph endpoint
`/me/outlook/masterCategories`. The response is default cached for
60 seconds.

**`memberof`** MSGraphService

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`cacheExpiry` | *number* | 60 | Cache expiry in seconds    |

**Returns:** *Promise*<any[]\>

Defined in: [services/msgraph/MSGraphService.ts:219](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L219)

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

Defined in: [services/msgraph/MSGraphService.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L70)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**`memberof`** MSGraphService

**Returns:** *Promise*<any\>

Defined in: [services/msgraph/MSGraphService.ts:145](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L145)

___

### getVacation

▸ **getVacation**(`category`: *string*): *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Get vacation for the current user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category for vacation    |

**Returns:** *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Defined in: [services/msgraph/MSGraphService.ts:88](https://github.com/Puzzlepart/did/blob/dev/server/services/msgraph/MSGraphService.ts#L88)
