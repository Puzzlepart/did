[did-server - v0.11.3](../README.md) / [Services](../modules/services.md) / MSOAuthService

# Class: MSOAuthService

[Services](../modules/services.md).MSOAuthService

Microsoft OAuth service

Used for renewing access token using `simple-oauth2`

## Table of contents

### Constructors

- [constructor](services.msoauthservice.md#constructor)

### Methods

- [\_getClient](services.msoauthservice.md#_getclient)
- [getAccessToken](services.msoauthservice.md#getaccesstoken)

## Constructors

### constructor

\+ **new MSOAuthService**(`_request`: *any*): [*MSOAuthService*](services.msoauthservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *any* |

**Returns:** [*MSOAuthService*](services.msoauthservice.md)

Defined in: [services/msoauth.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/services/msoauth.ts#L25)

## Methods

### \_getClient

▸ `Private`**_getClient**(`options`: MSAccessTokenOptions): *AuthorizationCode*<*client_id*\>

Get client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | MSAccessTokenOptions | Options    |

**Returns:** *AuthorizationCode*<*client_id*\>

Defined in: [services/msoauth.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/msoauth.ts#L33)

___

### getAccessToken

▸ **getAccessToken**(`options`: MSAccessTokenOptions): *Promise*<Token\>

Get access token

**`todo`** Fix temp hack for `Property 'tokenParams' does
not exist on type 'User'.`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | MSAccessTokenOptions | Options    |

**Returns:** *Promise*<Token\>

Defined in: [services/msoauth.ts:57](https://github.com/Puzzlepart/did/blob/dev/server/services/msoauth.ts#L57)
