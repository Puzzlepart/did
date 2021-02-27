[did-server](../README.md) / [services/oauth](../modules/services_oauth.md) / default

# Class: default

[services/oauth](../modules/services_oauth.md).default

## Table of contents

### Constructors

- [constructor](services_oauth.default.md#constructor)

### Methods

- [getAccessToken](services_oauth.default.md#getaccesstoken)

## Constructors

### constructor

\+ **new default**(`_request`: [*Request*](../interfaces/_custom_types.express.request.md)): [*default*](services_oauth.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | [*Request*](../interfaces/_custom_types.express.request.md) |

**Returns:** [*default*](services_oauth.default.md)

Defined in: [server/services/oauth.ts:18](https://github.com/Puzzlepart/did/blob/049fedc8/server/services/oauth.ts#L18)

## Methods

### getAccessToken

▸ **getAccessToken**(`options`: [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md)): *Promise*<Token\>

Get access token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | [*AccessTokenOptions*](../interfaces/services_oauth.accesstokenoptions.md) | Options    |

**Returns:** *Promise*<Token\>

Defined in: [server/services/oauth.ts:47](https://github.com/Puzzlepart/did/blob/049fedc8/server/services/oauth.ts#L47)
