[did-client - v0.9.8](../README.md) / [Utils](../modules/utils.md) / BrowserStorage

# Class: BrowserStorage<T\>

[Utils](../modules/utils.md).BrowserStorage

## Type parameters

Name | Default |
:------ | :------ |
`T` | *unknown* |

## Table of contents

### Constructors

- [constructor](utils.browserstorage.md#constructor)

### Properties

- [\_defaultExpire](utils.browserstorage.md#_defaultexpire)
- [\_key](utils.browserstorage.md#_key)
- [\_store](utils.browserstorage.md#_store)

### Methods

- [get](utils.browserstorage.md#get)
- [merge](utils.browserstorage.md#merge)
- [set](utils.browserstorage.md#set)

## Constructors

### constructor

\+ **new BrowserStorage**<T\>(`key`: *string*, `store`: *local* \| *session*): [*BrowserStorage*](utils.browserstorage.md)<T\>

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`store` | *local* \| *session* |

**Returns:** [*BrowserStorage*](utils.browserstorage.md)<T\>

Defined in: [client/utils/browserStorage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L10)

## Properties

### \_defaultExpire

• `Private` **\_defaultExpire**: Date

Defined in: [client/utils/browserStorage.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L8)

___

### \_key

• `Private` **\_key**: *string*

Defined in: [client/utils/browserStorage.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L6)

___

### \_store

• `Private` **\_store**: IPnPClientStore

Defined in: [client/utils/browserStorage.ts:7](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L7)

## Methods

### get

▸ **get**(`fallback?`: T): T

Get value

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fallback` | T | null | Fallback value    |

**Returns:** T

Defined in: [client/utils/browserStorage.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L22)

___

### merge

▸ **merge**(`value`: T): *void*

Merge value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [client/utils/browserStorage.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L40)

___

### set

▸ **set**(`value`: T): *void*

Set value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [client/utils/browserStorage.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L31)
