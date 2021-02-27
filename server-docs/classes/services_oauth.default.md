[did-server](../README.md) / [services/oauth](../modules/services_oauth.md) / default

# Class: default

[services/oauth](../modules/services_oauth.md).default

## Table of contents

### Constructors

- [constructor](services_oauth.default.md#constructor)

### Methods

- [\_getClient](services_oauth.default.md#_getclient)
- [getAccessToken](services_oauth.default.md#getaccesstoken)

## Constructors

### constructor

\+ **new default**(`_request`: *Request*): [*default*](services_oauth.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *Request* |

**Returns:** [*default*](services_oauth.default.md)

Defined in: [server/services/oauth.ts:18](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/oauth.ts#L18)

## Methods

### \_getClient

▸ `Private`**_getClient**(`options`: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)): *AuthorizationCode*<*client_id*\>

Get client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md) | Options    |

**Returns:** *AuthorizationCode*<*client_id*\>

Defined in: [server/services/oauth.ts:26](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/oauth.ts#L26)

___

### getAccessToken

▸ **getAccessToken**(`options`: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)): *Promise*<Token\>

Get access token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md) | Options    |

**Returns:** *Promise*<Token\>

Defined in: [server/services/oauth.ts:47](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/oauth.ts#L47)
