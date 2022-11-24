[did-client - v0.11.2](../README.md) / Utils

# Module: Utils

Reusable utility functions

## Table of contents

### Classes

- [BrowserStorage](../classes/utils.browserstorage.md)

### Functions

- [arrayExtend](utils.md#arrayextend)
- [arrayMap](utils.md#arraymap)
- [cleanArray](utils.md#cleanarray)
- [createPath](utils.md#createpath)
- [deepCopy](utils.md#deepcopy)
- [generateColumn](utils.md#generatecolumn)
- [getContrastColor](utils.md#getcontrastcolor)
- [getSum](utils.md#getsum)
- [loadScripts](utils.md#loadscripts)
- [omitDeep](utils.md#omitdeep)
- [omitTypename](utils.md#omittypename)
- [searchObject](utils.md#searchobject)
- [sleep](utils.md#sleep)
- [sortAlphabetically](utils.md#sortalphabetically)
- [toMap](utils.md#tomap)
- [tryParseJson](utils.md#tryparsejson)

## Functions

### arrayExtend

▸ **arrayExtend**<T\>(`array`: T[], `props?`: *ArrayExtendProps*<T\>, `condition?`: *boolean*): T[]

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
`props?` | *ArrayExtendProps*<T\> | - | Props to set   |
`condition` | *boolean* | true | Condition    |

**Returns:** T[]

Defined in: [client/utils/arrayExtend.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/utils/arrayExtend.ts#L15)

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

Defined in: [client/utils/arrayMap.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/arrayMap.ts#L8)

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

Defined in: [client/utils/cleanArray.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/cleanArray.ts#L8)

___

### createPath

▸ **createPath**(`parts`: *string*[]): *any*

Creates an URL path from the specified `parts`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parts` | *string*[] | Parts    |

**Returns:** *any*

Defined in: [client/utils/createPath.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/createPath.ts#L6)

___

### deepCopy

▸ **deepCopy**(`object`: *any*): *any*

Makes a deep copy of the object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *any* | Object    |

**Returns:** *any*

Defined in: [client/utils/deepCopy.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/deepCopy.ts#L6)

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

Defined in: [client/utils/generateColumn.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/generateColumn.ts#L12)

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

Defined in: [client/utils/getContrastColor.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/getContrastColor.ts#L11)

___

### getSum

▸ **getSum**(`items`: Item[], `property`: *string*): *number*

Get sum for a property in the array using `_.reduce`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | Item[] | Items   |
`property` | *string* | Property key    |

**Returns:** *number*

Defined in: [client/utils/getSum.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/getSum.ts#L12)

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

Defined in: [client/utils/loadScripts.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/loadScripts.ts#L11)

___

### omitDeep

▸ **omitDeep**(`value`: *any*, `key`: *string*): *any*

Omit deep, used to remove __typename from GraphQL responses

**`see`** https://gist.github.com/Billy-/d94b65998501736bfe6521eadc1ab538

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *any* | Value   |
`key` | *string* | Key to omit    |

**Returns:** *any*

Defined in: [client/utils/omitDeep.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/omitDeep.ts#L9)

___

### omitTypename

▸ **omitTypename**(`object`: *any*): *any*

Omits `__typename` from the `obj`

#### Parameters:

Name | Type |
:------ | :------ |
`object` | *any* |

**Returns:** *any*

Defined in: [client/utils/omitTypename.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/omitTypename.ts#L9)

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

Defined in: [client/utils/searchObject.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/utils/searchObject.ts#L19)

___

### sleep

▸ **sleep**(`n`: *number*): *Promise*<unknown\>

Sleep for n seconds

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`n` | *number* | Seconds to sleep    |

**Returns:** *Promise*<unknown\>

Defined in: [client/utils/sleep.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/sleep.ts#L6)

___

### sortAlphabetically

▸ **sortAlphabetically**(`stringArray`: *string*[]): *string*[]

Sort alphabetically

#### Parameters:

Name | Type |
:------ | :------ |
`stringArray` | *string*[] |

**Returns:** *string*[]

Defined in: [client/utils/sortAlphabetically.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/sortAlphabetically.ts#L6)

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

Defined in: [client/utils/toMap.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/toMap.ts#L6)

___

### tryParseJson

▸ **tryParseJson**<T\>(`string_`: *string*, `fallbackValue?`: T): T

Attempts to parse JSON string, and falls back
to the specified fallbackValue if the parse fails.

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

Defined in: [client/utils/tryParseJson.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/tryParseJson.ts#L8)
