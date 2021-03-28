[did-client - v0.9.12](../README.md) / Utils

# Module: Utils

Reusable utility functions

## Table of contents

### Classes

- [BrowserStorage](../classes/utils.browserstorage.md)

### Functions

- [arrayExtend](utils.md#arrayextend)
- [arrayMap](utils.md#arraymap)
- [cleanArray](utils.md#cleanarray)
- [generateColumn](utils.md#generatecolumn)
- [getContrastColor](utils.md#getcontrastcolor)
- [getSum](utils.md#getsum)
- [loadScripts](utils.md#loadscripts)
- [omitTypename](utils.md#omittypename)
- [searchObject](utils.md#searchobject)
- [sleep](utils.md#sleep)
- [toMap](utils.md#tomap)
- [tryParseJson](utils.md#tryparsejson)

## Functions

### arrayExtend

▸ **arrayExtend**<T\>(`array`: T[], `props?`: *Record*<keyof T, any\>, `condition?`: *boolean*): T[]

Extends all items in the `array` with `props`
if `condition` equals `true`

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`array` | T[] | - | Array   |
`props?` | *Record*<keyof T, any\> | - | Props to set   |
`condition` | *boolean* | true | Condition    |

**Returns:** T[]

Defined in: [utils/arrayExtend.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/arrayExtend.ts#L11)

___

### arrayMap

▸ **arrayMap**<T\>(`arr`: T[], `callbackfn`: (`value`: T, `index`: *number*) => T): T[]

Array map with `null` / `undefined` check

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arr` | T[] | Array   |
`callbackfn` | (`value`: T, `index`: *number*) => T | Map callback function    |

**Returns:** T[]

Defined in: [utils/arrayMap.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/arrayMap.ts#L8)

___

### cleanArray

▸ **cleanArray**<T\>(`array`: T[]): T[]

Cleans an array removing `undefined` and `null`

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`array` | T[] | Array    |

**Returns:** T[]

Defined in: [utils/cleanArray.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/cleanArray.ts#L8)

___

### generateColumn

▸ **generateColumn**(`fieldName`: *string*, `name?`: *string*, `props?`: *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)\>, `onRender?`: (`item?`: *any*, `index?`: *number*, `column?`: [*IListColumn*](../interfaces/components.ilistcolumn.md)) => *any*, `minWidth?`: *number*): [*IListColumn*](../interfaces/components.ilistcolumn.md)

Generate a `IListColumn` defintion

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fieldName` | *string* | - | Field name   |
`name` | *string* | '' | -Name   |
`props` | *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)\> | - | Additional props   |
`onRender?` | (`item?`: *any*, `index?`: *number*, `column?`: [*IListColumn*](../interfaces/components.ilistcolumn.md)) => *any* | - | Render function   |
`minWidth` | *number* | 100 | Min width    |

**Returns:** [*IListColumn*](../interfaces/components.ilistcolumn.md)

Defined in: [utils/generateColumn.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/generateColumn.ts#L12)

___

### getContrastColor

▸ **getContrastColor**(`hexColor`: *string*): *string*

Get the contrasting color for any hex color
(c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`hexColor` | *string* | A hexcolor value    |

**Returns:** *string*

The contrasting color (black or white)

Defined in: [utils/getContrastColor.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/getContrastColor.ts#L11)

___

### getSum

▸ **getSum**(`items`: Item[], `property`: *string*): *number*

Get sum for a property in the array using _.reduce.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | Item[] | Items   |
`property` | *string* | Property key    |

**Returns:** *number*

Defined in: [utils/getSum.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/getSum.ts#L12)

___

### loadScripts

▸ **loadScripts**<T\>(`scriptSource`: *string*[], `basePath?`: *string*, `globals`: *Record*<string, string\>): *Promise*<T\>

Load scripts using document.createElement

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`scriptSource` | *string*[] | - | - |
`basePath` | *string* | '' | Base path   |
`globals` | *Record*<string, string\> | - | Globals    |

**Returns:** *Promise*<T\>

Defined in: [utils/loadScripts.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/loadScripts.ts#L11)

___

### omitTypename

▸ **omitTypename**(`object`: *any*): *any*

Omits `__typename` from the `obj`

#### Parameters:

Name | Type |
:------ | :------ |
`object` | *any* |

**Returns:** *any*

Defined in: [utils/omitTypename.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/omitTypename.ts#L9)

___

### searchObject

▸ **searchObject**<T\>(`__namedParameters`: *SearchObjectOptions*<T\>): *boolean*

Searces the object values for a match of `searchString`

Available options (`SearchObjectOptions`)
- `item` **required** - The item to search
- `searchTerm` **required** The term to search for
- `pick_` _optional_ - Properties to search in
- `omit_` _optional_ - Properties to ignore

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *SearchObjectOptions*<T\> |

**Returns:** *boolean*

Defined in: [utils/searchObject.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/utils/searchObject.ts#L19)

___

### sleep

▸ **sleep**(`n`: *number*): *Promise*<unknown\>

Sleep for n seconds

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`n` | *number* | Seconds to sleep    |

**Returns:** *Promise*<unknown\>

Defined in: [utils/sleep.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/sleep.ts#L6)

___

### toMap

▸ **toMap**<KeyType\>(`object`: *Record*<string, any\>): *Map*<KeyType, any\>

Converts an `object` to a `Map`

#### Type parameters:

Name | Default |
:------ | :------ |
`KeyType` | *string* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *Record*<string, any\> | Object    |

**Returns:** *Map*<KeyType, any\>

Defined in: [utils/toMap.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/toMap.ts#L6)

___

### tryParseJson

▸ **tryParseJson**<T\>(`string_`: *string*, `fallbackValue?`: T): T

Attempts to parse JSON string, and falls back to the specified fallbackValue if
the parse fails.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`string_` | *string* | - | String to parse   |
`fallbackValue` | T | null | Fallback value    |

**Returns:** T

Defined in: [utils/tryParseJson.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/tryParseJson.ts#L8)
