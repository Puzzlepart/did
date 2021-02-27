[did-server](../README.md) / [services](../modules/services.md) / MSGraphService

# Class: MSGraphService

[services](../modules/services.md).MSGraphService

## Table of contents

### Constructors

- [constructor](services.msgraphservice.md#constructor)

### Methods

- [createOutlookCategory](services.msgraphservice.md#createoutlookcategory)
- [endMark](services.msgraphservice.md#endmark)
- [getCurrentUser](services.msgraphservice.md#getcurrentuser)
- [getEvents](services.msgraphservice.md#getevents)
- [getOutlookCategories](services.msgraphservice.md#getoutlookcategories)
- [getUsers](services.msgraphservice.md#getusers)
- [startMark](services.msgraphservice.md#startmark)

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

Defined in: [server/services/msgraph/index.ts:27](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L27)

## Methods

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<MSGraphOutlookCategory\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<MSGraphOutlookCategory\>

Defined in: [server/services/msgraph/index.ts:145](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L145)

___

### endMark

▸ **endMark**(`measure`: *string*): *void*

Ends a performance mark

#### Parameters:

Name | Type |
:------ | :------ |
`measure` | *string* |

**Returns:** *void*

Defined in: [server/services/msgraph/index.ts:65](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L65)

___

### getCurrentUser

▸ **getCurrentUser**(`properties`: *string*[]): *Promise*<any\>

Get current user properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`properties` | *string*[] | Properties to retrieve    |

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:94](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L94)

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

Defined in: [server/services/msgraph/index.ts:193](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L193)

___

### getOutlookCategories

▸ **getOutlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [server/services/msgraph/index.ts:173](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L173)

___

### getUsers

▸ **getUsers**(): *Promise*<any\>

Get Azure Active Directory users

**Returns:** *Promise*<any\>

Defined in: [server/services/msgraph/index.ts:113](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L113)

___

### startMark

▸ **startMark**(`measure`: *string*): *void*

Starts a performance mark

#### Parameters:

Name | Type |
:------ | :------ |
`measure` | *string* |

**Returns:** *void*

Defined in: [server/services/msgraph/index.ts:56](https://github.com/Puzzlepart/did/blob/ee943744/server/services/msgraph/index.ts#L56)
