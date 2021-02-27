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

Defined in: [server/services/cache.ts:24](https://github.com/Puzzlepart/did/blob/3af41116/server/services/cache.ts#L24)

## Properties

### prefix

• `Optional` **prefix**: *string*

___

### scope

• **scope**: [*CacheScope*](../enums/services_cache.cachescope.md)

## Methods

### clear

▸ **clear**(`__namedParameters`: CacheOptions): *Promise*<unknown\>

Clear cache for the specified key and scope

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CacheOptions |

**Returns:** *Promise*<unknown\>

Defined in: [server/services/cache.ts:123](https://github.com/Puzzlepart/did/blob/3af41116/server/services/cache.ts#L123)

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

Defined in: [server/services/cache.ts:139](https://github.com/Puzzlepart/did/blob/3af41116/server/services/cache.ts#L139)
