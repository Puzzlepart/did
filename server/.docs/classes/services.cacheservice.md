[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / CacheService

# Class: CacheService

[Services](../modules/services.md).CacheService

Cache service

## Table of contents

### Constructors

- [constructor](services.cacheservice.md#constructor)

### Properties

- [prefix](services.cacheservice.md#prefix)
- [scope](services.cacheservice.md#scope)

### Methods

- [\_get](services.cacheservice.md#_get)
- [\_getScopedCacheKey](services.cacheservice.md#_getscopedcachekey)
- [\_set](services.cacheservice.md#_set)
- [clear](services.cacheservice.md#clear)
- [usingCache](services.cacheservice.md#usingcache)

## Constructors

### constructor

\+ **new CacheService**(`context`: *Context*, `prefix?`: *string*, `scope?`: [*CacheScope*](../enums/services.cachescope.md)): [*CacheService*](services.cacheservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Scope (defaults to CacheScope.SUBSCRIPTION)    |
`prefix?` | *string* | Prefix   |
`scope` | [*CacheScope*](../enums/services.cachescope.md) | - |

**Returns:** [*CacheService*](services.cacheservice.md)

Defined in: [services/cache.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L30)

## Properties

### prefix

• `Optional` **prefix**: *string*

___

### scope

• **scope**: [*CacheScope*](../enums/services.cachescope.md)

## Methods

### \_get

▸ `Private`**_get**<T\>(`__namedParameters`: CacheOptions): *Promise*<T\>

Get from cache by key

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<T\>

Defined in: [services/cache.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L73)

___

### \_getScopedCacheKey

▸ `Private`**_getScopedCacheKey**(`key`: *string* \| *string*[], `scope?`: [*CacheScope*](../enums/services.cachescope.md)): *string*

Get scoped cache key

Key can either be an string or  an array of string.
If it's an array it will be filtered to remove empty/null
values and joined by :.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* \| *string*[] | Cache key   |
`scope` | [*CacheScope*](../enums/services.cachescope.md) | Cache scope    |

**Returns:** *string*

Defined in: [services/cache.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L54)

___

### \_set

▸ `Private`**_set**<T\>(`__namedParameters`: CacheOptions, `value`: T): *Promise*<unknown\>

Set value in cache

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`__namedParameters` | CacheOptions | - |
`value` | T | Cache value    |

**Returns:** *Promise*<unknown\>

Defined in: [services/cache.ts:95](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L95)

___

### clear

▸ **clear**(`__namedParameters`: CacheOptions): *Promise*<unknown\>

Clear cache for the specified key and scope

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<unknown\>

Defined in: [services/cache.ts:125](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L125)

___

### usingCache

▸ **usingCache**<T\>(`function_`: () => *Promise*<T\>, `__namedParameters`: CacheOptions): *Promise*<T\>

Using cache

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`function_` | () => *Promise*<T\> |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<T\>

Defined in: [services/cache.ts:142](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L142)
