[did-server - v0.10.5](../README.md) / [Services](../modules/services.md) / CacheService

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

Defined in: [services/cache.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L44)

## Properties

### prefix

• `Optional` **prefix**: *string*

___

### scope

• **scope**: [*CacheScope*](../enums/services.cachescope.md)

## Methods

### \_get

▸ `Private`**_get**<T\>(`__namedParameters`: [*CacheOptions*](../modules/services.md#cacheoptions)): *Promise*<T\>

Get from cache by key

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*CacheOptions*](../modules/services.md#cacheoptions) |

**Returns:** *Promise*<T\>

Defined in: [services/cache.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L87)

___

### \_getScopedCacheKey

▸ `Private`**_getScopedCacheKey**(`key`: [*CacheKey*](../modules/services.md#cachekey), `scope?`: [*CacheScope*](../enums/services.cachescope.md)): *string*

Get scoped cache key

Key can either be an string or  an array of string.
If it's an array it will be filtered to remove empty/null
values and joined by :.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | [*CacheKey*](../modules/services.md#cachekey) | Cache key   |
`scope` | [*CacheScope*](../enums/services.cachescope.md) | Cache scope    |

**Returns:** *string*

Defined in: [services/cache.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L68)

___

### \_set

▸ `Private`**_set**<T\>(`__namedParameters`: [*CacheOptions*](../modules/services.md#cacheoptions), `value`: T): *Promise*<unknown\>

Set value in cache

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`__namedParameters` | [*CacheOptions*](../modules/services.md#cacheoptions) | - |
`value` | T | Cache value    |

**Returns:** *Promise*<unknown\>

Defined in: [services/cache.ts:109](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L109)

___

### clear

▸ **clear**(`__namedParameters`: [*CacheOptions*](../modules/services.md#cacheoptions)): *Promise*<unknown\>

Clear cache for the specified key and scope

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*CacheOptions*](../modules/services.md#cacheoptions) |

**Returns:** *Promise*<unknown\>

Defined in: [services/cache.ts:139](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L139)

___

### usingCache

▸ **usingCache**<T\>(`function_`: () => *Promise*<T\>, `__namedParameters`: [*CacheOptions*](../modules/services.md#cacheoptions)): *Promise*<T\>

Using cache

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`function_` | () => *Promise*<T\> |
`__namedParameters` | [*CacheOptions*](../modules/services.md#cacheoptions) |

**Returns:** *Promise*<T\>

Defined in: [services/cache.ts:156](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L156)
