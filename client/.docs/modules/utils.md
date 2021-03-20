[did-client - v0.9.11](../README.md) / Utils

# Module: Utils

Reusable utility functions

## Table of contents

### Classes

- [BrowserStorage](../classes/utils.browserstorage.md)

### Functions

- [generateColumn](utils.md#generatecolumn)
- [getContrastColor](utils.md#getcontrastcolor)
- [getSum](utils.md#getsum)
- [loadScripts](utils.md#loadscripts)
- [searchObject](utils.md#searchobject)
- [sleep](utils.md#sleep)
- [tryParseJson](utils.md#tryparsejson)

## Functions

### generateColumn

▸ **generateColumn**(`fieldName`: *string*, `name?`: *string*, `props?`: *Partial*<IListColumn\>, `onRender?`: (`item?`: *any*, `index?`: *number*, `column?`: IListColumn) => *any*, `minWidth?`: *number*): IListColumn

Generate a `IListColumn` defintion

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fieldName` | *string* | - | Field name   |
`name` | *string* | '' | -Name   |
`props` | *Partial*<IListColumn\> | - | Additional props   |
`onRender?` | (`item?`: *any*, `index?`: *number*, `column?`: IListColumn) => *any* | - | Render function   |
`minWidth` | *number* | 100 | Min width    |

**Returns:** IListColumn

Defined in: [utils/generateColumn.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/generateColumn.ts#L12)

___

### getContrastColor

▸ **getContrastColor**(`hexcolor`: *string*): *black* \| *white*

Get the contrasting color for any hex color
(c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/

#### Parameters:

Name | Type |
:------ | :------ |
`hexcolor` | *string* |

**Returns:** *black* \| *white*

The contrasting color (black or white)

Defined in: [utils/getContrastColor.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/utils/getContrastColor.ts#L10)

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
