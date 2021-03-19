[did-server - v0.9.11](../README.md) / [services/oauth](../modules/services_oauth.md) / default

# Class: default

[services/oauth](../modules/services_oauth.md).default

OAuth service

## Table of contents

### Constructors

- [constructor](services_oauth.default.md#constructor)

### Methods

- [\_getClient](services_oauth.default.md#_getclient)
- [getAccessToken](services_oauth.default.md#getaccesstoken)

## Constructors

### constructor

\+ **new default**(`_request`: *any*): [*default*](services_oauth.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *any* |

**Returns:** [*default*](services_oauth.default.md)

Defined in: [server/services/oauth.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L24)

## Methods

### \_getClient

▸ `Private`**_getClient**(`options`: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)): *AuthorizationCode*<*client_id*\>

Get client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md) | Options    |

**Returns:** *AuthorizationCode*<*client_id*\>

Defined in: [server/services/oauth.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L32)

___

### getAccessToken

▸ **getAccessToken**(`options`: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)): *Promise*<Token\>

Get access token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md) | Options    |

**Returns:** *Promise*<Token\>

Defined in: [server/services/oauth.ts:53](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L53)
