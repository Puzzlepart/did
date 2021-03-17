[did-server - v0.9.9](../README.md) / [services](../modules/services.md) / CacheService

# Class: CacheService

[services](../modules/services.md).CacheService

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

\+ **new CacheService**(`context`: [*Context*](graphql_context.context.md), `prefix?`: *string*, `scope?`: [*CacheScope*](../enums/services_cache.cachescope.md)): [*CacheService*](services_cache.cacheservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Scope (defaults to CacheScope.SUBSCRIPTION)    |
`prefix?` | *string* | Prefix   |
`scope` | [*CacheScope*](../enums/services_cache.cachescope.md) | - |

**Returns:** [*CacheService*](services_cache.cacheservice.md)

Defined in: [server/services/cache.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L24)

## Properties

### prefix

• `Optional` **prefix**: *string*

___

### scope

• **scope**: [*CacheScope*](../enums/services_cache.cachescope.md)

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

Defined in: [server/services/cache.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L67)

___

### \_getScopedCacheKey

▸ `Private`**_getScopedCacheKey**(`key`: [*CacheKey*](../modules/services_cache.md#cachekey), `scope?`: [*CacheScope*](../enums/services_cache.cachescope.md)): *string*

Get scoped cache key

Key can either be an string or  an array of string.
If it's an array it will be filtered to remove empty/null
values and joined by :.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | [*CacheKey*](../modules/services_cache.md#cachekey) | Cache key   |
`scope` | [*CacheScope*](../enums/services_cache.cachescope.md) | Cache scope    |

**Returns:** *string*

Defined in: [server/services/cache.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L48)

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

Defined in: [server/services/cache.ts:89](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L89)

___

### clear

▸ **clear**(`__namedParameters`: CacheOptions): *Promise*<unknown\>

Clear cache for the specified key and scope

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<unknown\>

Defined in: [server/services/cache.ts:119](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L119)

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

Defined in: [server/services/cache.ts:136](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L136)
