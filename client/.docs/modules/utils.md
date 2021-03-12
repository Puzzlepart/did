[did-client - v0.9.8](../README.md) / Utils

# Module: Utils

Reusable utility functions

## Table of contents

### Classes

- [BrowserStorage](../classes/utils.browserstorage.md)

### Functions

- [generateColumn](utils.md#generatecolumn)
- [getSum](utils.md#getsum)
- [loadScripts](utils.md#loadscripts)
- [searchObject](utils.md#searchobject)
- [sleep](utils.md#sleep)
- [tryParseJson](utils.md#tryparsejson)

## Functions

### generateColumn

▸ **generateColumn**(`fieldName`: *string*, `name?`: *string*, `props?`: *Partial*<IColumn\>, `onRender?`: (`item?`: *any*, `index?`: *number*, `column?`: IColumn) => *any*, `minWidth?`: *number*): IColumn

Generate a IColumn defintion

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fieldName` | *string* | - | Field name   |
`name` | *string* | '' | -Name   |
`props` | *Partial*<IColumn\> | - | Additional props   |
`onRender?` | (`item?`: *any*, `index?`: *number*, `column?`: IColumn) => *any* | - | On render function   |
`minWidth` | *number* | 100 | Min width    |

**Returns:** IColumn

Defined in: [client/utils/generateColumn.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/generateColumn.ts#L12)

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

Defined in: [client/utils/getSum.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/utils/getSum.ts#L12)

___

### loadScripts

▸ **loadScripts**(`scriptSource`: *string*[]): *Promise*<void\>

Load scripts using document.createElement

#### Parameters:

Name | Type |
:------ | :------ |
`scriptSource` | *string*[] |

**Returns:** *Promise*<void\>

Defined in: [client/utils/loadScripts.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/loadScripts.ts#L6)

___

### searchObject

▸ **searchObject**<T\>(`item`: T, `searchString`: *string*): *boolean*

Search object

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`item` | T | Item   |
`searchString` | *string* | - |

**Returns:** *boolean*

Defined in: [client/utils/searchObject.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/searchObject.ts#L9)

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

Defined in: [client/utils/tryParseJson.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/tryParseJson.ts#L8)
