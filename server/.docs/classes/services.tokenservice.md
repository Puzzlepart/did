[did-server - v0.9.11](../README.md) / [services](../modules/services.md) / TokenService

# Class: TokenService

[services](../modules/services.md).TokenService

OAuth service

## Table of contents

### Constructors

- [constructor](services.tokenservice.md#constructor)

### Methods

- [\_getClient](services.tokenservice.md#_getclient)
- [getAccessToken](services.tokenservice.md#getaccesstoken)

## Constructors

### constructor

\+ **new TokenService**(`_request`: *any*): [*TokenService*](services.tokenservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *any* |

**Returns:** [*TokenService*](services.tokenservice.md)

Defined in: [services/oauth.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L24)

## Methods

### \_getClient

▸ `Private`**_getClient**(`options`: AccessTokenOptions): *AuthorizationCode*<*client_id*\>

Get client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | AccessTokenOptions | Options    |

**Returns:** *AuthorizationCode*<*client_id*\>

Defined in: [services/oauth.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L32)

___

### getAccessToken

▸ **getAccessToken**(`options`: AccessTokenOptions): *Promise*<Token\>

Get access token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | AccessTokenOptions | Options    |

**Returns:** *Promise*<Token\>

Defined in: [services/oauth.ts:53](https://github.com/Puzzlepart/did/blob/dev/server/services/oauth.ts#L53)
