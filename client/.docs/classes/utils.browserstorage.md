[did-client - v0.13.0](../README.md) / [Utils](../modules/utils.md) / BrowserStorage

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

- [\_key](utils.browserstorage.md#_key)

### Methods

- [get](utils.browserstorage.md#get)
- [merge](utils.browserstorage.md#merge)
- [set](utils.browserstorage.md#set)

## Constructors

### constructor

\+ **new BrowserStorage**<T\>(`key`: *string*, `_store?`: Storage): [*BrowserStorage*](utils.browserstorage.md)<T\>

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`_store` | Storage |

**Returns:** [*BrowserStorage*](utils.browserstorage.md)<T\>

Defined in: [client/utils/browserStorage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L10)

## Properties

### \_key

• `Private` **\_key**: *string*

Defined in: [client/utils/browserStorage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L10)

## Methods

### get

▸ **get**(`fallback?`: T): T

Get value

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fallback` | T | null | Fallback value    |

**Returns:** T

Defined in: [client/utils/browserStorage.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L21)

___

### merge

▸ **merge**(`value`: T): *void*

Merge value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [client/utils/browserStorage.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L39)

___

### set

▸ **set**(`value`: T): *void*

Set value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | T | New value    |

**Returns:** *void*

Defined in: [client/utils/browserStorage.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/utils/browserStorage.ts#L30)
