[did-client - v0.12.0](../README.md) / [Hooks](../modules/hooks.md) / TypedMap

# Interface: TypedMap<KeyType, ObjectType, ValueType\>

[Hooks](../modules/hooks.md).TypedMap

A typed map interface that provides type safety for keys and values.

## Type parameters

Name | Default | Description |
:------ | :------ | :------ |
`KeyType` | - | The type of the keys in the map.   |
`ObjectType` | - | The type of the object that contains the map.   |
`ValueType` | *any* | The type of the values in the map. Defaults to `any`.    |

## Table of contents

### Properties

- [$](hooks.typedmap.md#$)
- [$set](hooks.typedmap.md#$set)
- [isSet](hooks.typedmap.md#isset)
- [reset](hooks.typedmap.md#reset)
- [set](hooks.typedmap.md#set)
- [value](hooks.typedmap.md#value)

## Properties

### $

• **$**: ObjectType

The object representation of the map.

Defined in: [client/hooks/common/useMap.ts:107](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L107)

___

### $set

• **$set**: (`map`: *Map*<KeyType, ValueType\>) => *void*

Sets the entire map to the given `Map`.

**`param`** The `Map` to set the typed map to.

#### Type declaration:

▸ (`map`: *Map*<KeyType, ValueType\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`map` | *Map*<KeyType, ValueType\> |

**Returns:** *void*

Defined in: [client/hooks/common/useMap.ts:102](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L102)

Defined in: [client/hooks/common/useMap.ts:102](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L102)

___

### isSet

• **isSet**: (...`keys`: KeyType[]) => *boolean*

Checks if all of the given keys are set in the map.

**`param`** The keys to check for in the map.

**`returns`** `true` if all of the given keys are set in the map, `false` otherwise.

#### Type declaration:

▸ (...`keys`: KeyType[]): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`...keys` | KeyType[] |

**Returns:** *boolean*

Defined in: [client/hooks/common/useMap.ts:140](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L140)

Defined in: [client/hooks/common/useMap.ts:140](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L140)

___

### reset

• **reset**: () => *void*

Resets the entire map to an empty `Map`.

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/hooks/common/useMap.ts:131](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L131)

Defined in: [client/hooks/common/useMap.ts:131](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L131)

___

### set

• **set**: (`key`: KeyType, `value`: ValueType) => *void*

Sets the value of the given key in the map.

**`param`** The key to set the value for.

**`param`** The value to set for the given key.

#### Type declaration:

▸ (`key`: KeyType, `value`: ValueType): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | KeyType |
`value` | ValueType |

**Returns:** *void*

Defined in: [client/hooks/common/useMap.ts:115](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L115)

Defined in: [client/hooks/common/useMap.ts:115](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L115)

___

### value

• **value**: <T\>(`key?`: KeyType, `defaultValue?`: T) => T

Gets the value of the given key in the map.
If no key is specified the entire object (`$`) is returned.

**`param`** The key to get the value for.

**`param`** The default value to return if the key is not found in the map.

**`returns`** The value of the given key in the map, or the default value if the key is not found.

#### Type declaration:

▸ <T\>(`key?`: KeyType, `defaultValue?`: T): T

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`key?` | KeyType |
`defaultValue?` | T |

**Returns:** T

Defined in: [client/hooks/common/useMap.ts:126](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L126)

Defined in: [client/hooks/common/useMap.ts:126](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L126)
