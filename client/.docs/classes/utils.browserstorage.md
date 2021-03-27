[did-client - v0.9.12](../README.md) / [Utils](../modules/utils.md) / BrowserStorage

# Class: BrowserStorage<T\>

[Utils](../modules/utils.md).BrowserStorage

Browser storage class

**`remarks`** Should be replaced with the `useBrowserStorage`
hook in the future.

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

Defined in: [utils/browserStorage.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L16)

## Properties

### \_defaultExpire

• `Private` **\_defaultExpire**: Date

Defined in: [utils/browserStorage.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L14)

___

### \_key

• `Private` **\_key**: *string*

Defined in: [utils/browserStorage.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L12)

___

### \_store

• `Private` **\_store**: IPnPClientStore

Defined in: [utils/browserStorage.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L13)

## Methods

### get

▸ **get**(`fallback?`: T): T

Get value

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fallback` | T | null | Fallback value    |

**Returns:** T

Defined in: [utils/browserStorage.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L28)

___

### merge

▸ **merge**(`value`: T): *void*

Merge value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [utils/browserStorage.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L46)

___

### set

▸ **set**(`value`: T): *void*

Set value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [utils/browserStorage.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L37)
