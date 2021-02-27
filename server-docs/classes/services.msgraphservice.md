[did-server](../README.md) / [services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[services](../modules/services.md).MSGraphService

## Table of contents

### Constructors

- [constructor](services.msgraphservice.md#constructor)

### Methods

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

Defined in: [server/services/msgraph/index.ts:27](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L27)

## Methods

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<MSGraphOutlookCategory\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<MSGraphOutlookCategory\>

Defined in: [server/services/msgraph/index.ts:107](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L107)

___

### getCurrentUser

▸ **getCurrentUser**(`properties`: *string*[]): *Promise*<any\>

Get current user properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`properties` | *string*[] | Properties to retrieve    |

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:60](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L60)

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

Defined in: [server/services/msgraph/index.ts:151](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L151)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [server/services/msgraph/index.ts:133](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L133)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:77](https://github.com/Puzzlepart/did/blob/dfb8b3b9/server/services/msgraph/index.ts#L77)
