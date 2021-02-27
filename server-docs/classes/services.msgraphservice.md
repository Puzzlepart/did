[did-server](../README.md) / [services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[services](../modules/services.md).MSGraphService

## Table of contents

### Constructors

- [constructor](services.msgraphservice.md#constructor)

### Properties

- [\_accessTokenOptions](services.msgraphservice.md#_accesstokenoptions)

### Methods

- [\_getClient](services.msgraphservice.md#_getclient)
- [createOutlookCategory](services.msgraphservice.md#createoutlookcategory)
- [getCurrentUser](services.msgraphservice.md#getcurrentuser)
- [getEvents](services.msgraphservice.md#getevents)
- [getOutlookCategories](services.msgraphservice.md#getoutlookcategories)
- [getUsers](services.msgraphservice.md#getusers)

## Constructors

### constructor

\+ **new MSGraphService**(`_oauthService`: [*default*](services_oauth.default.md), `_access_token?`: *string*): [*MSGraphService*](services.msgraphservice.md)

Constructs a new MSGraphService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_oauthService` | [*default*](services_oauth.default.md) | OAuth service   |
`_access_token?` | *string* | - |

**Returns:** [*MSGraphService*](services.msgraphservice.md)

Defined in: [server/services/msgraph/index.ts:25](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L25)

## Properties

### \_accessTokenOptions

• `Private` **\_accessTokenOptions**: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)

Defined in: [server/services/msgraph/index.ts:19](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L19)

## Methods

### \_getClient

▸ `Private`**_getClient**(): *Promise*<Client\>

Gets a Microsoft Graph Client using the auth token from the class

**Returns:** *Promise*<Client\>

Defined in: [server/services/msgraph/index.ts:41](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L41)

___

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<MSGraphOutlookCategory\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<MSGraphOutlookCategory\>

Defined in: [server/services/msgraph/index.ts:105](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L105)

___

### getCurrentUser

▸ **getCurrentUser**(`properties`: *string*[]): *Promise*<any\>

Get current user properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`properties` | *string*[] | Properties to retrieve    |

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:58](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L58)

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

Defined in: [server/services/msgraph/index.ts:149](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L149)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [server/services/msgraph/index.ts:131](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L131)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:75](https://github.com/Puzzlepart/did/blob/846b6048/server/services/msgraph/index.ts#L75)
