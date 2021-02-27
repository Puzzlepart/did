[did-server](../README.md) / [services/cache](../modules/services_cache.md) / CacheService

# Class: CacheService

[services/cache](../modules/services_cache.md).CacheService

## Table of contents

### Constructors

- [constructor](services_cache.cacheservice.md#constructor)

### Properties

- [prefix](services_cache.cacheservice.md#prefix)
- [scope](services_cache.cacheservice.md#scope)

### Methods

- [\_get](services_cache.cacheservice.md#_get)
- [\_getScopedCacheKey](services_cache.cacheservice.md#_getscopedcachekey)
- [\_set](services_cache.cacheservice.md#_set)
- [clear](services_cache.cacheservice.md#clear)
- [usingCache](services_cache.cacheservice.md#usingcache)

## Constructors

### constructor

\+ **new CacheService**(`context`: [*Context*](graphql_context.context.md), `prefix?`: *string*, `scope?`: [*CacheScope*](../enums/services_cache.cachescope.md)): [*CacheService*](services_cache.cacheservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context   |
`prefix?` | *string* | Prefix   |
`scope` | [*CacheScope*](../enums/services_cache.cachescope.md) | Scope (defaults to CacheScope.SUBSCRIPTION)    |

**Returns:** [*CacheService*](services_cache.cacheservice.md)

Defined in: [server/services/cache.ts:24](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L24)

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

Defined in: [server/services/cache.ts:69](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L69)

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

Defined in: [server/services/cache.ts:48](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L48)

___

### \_set

▸ `Private`**_set**<T\>(`__namedParameters`: CacheOptions, `value`: T): *Promise*<unknown\>

Get from cache by key

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

Defined in: [server/services/cache.ts:93](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L93)

___

### clear

▸ **clear**(`__namedParameters`: CacheOptions): *Promise*<unknown\>

Clear cache for the specified key and scope

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<unknown\>

Defined in: [server/services/cache.ts:123](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L123)

___

### usingCache

▸ **usingCache**<T\>(`func`: () => *Promise*<T\>, `__namedParameters`: CacheOptions): *Promise*<T\>

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`func` | () => *Promise*<T\> | Promise function   |
`__namedParameters` | CacheOptions | - |

**Returns:** *Promise*<T\>

Defined in: [server/services/cache.ts:139](https://github.com/Puzzlepart/did/blob/4fa695e4/server/services/cache.ts#L139)
