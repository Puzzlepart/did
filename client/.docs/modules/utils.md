[did-client - v0.12.0](../README.md) / Utils

# Module: Utils

Reusable utility functions

## Table of contents

### Classes

- [BrowserStorage](../classes/utils.browserstorage.md)

### Type aliases

- [FluentIconName](utils.md#fluenticonname)

### Functions

- [arrayExtend](utils.md#arrayextend)
- [arrayMap](utils.md#arraymap)
- [cleanArray](utils.md#cleanarray)
- [convertToMap](utils.md#converttomap)
- [createColumnDef](utils.md#createcolumndef)
- [createPath](utils.md#createpath)
- [createRouterLink](utils.md#createrouterlink)
- [deepCopy](utils.md#deepcopy)
- [fuzzyMap](utils.md#fuzzymap)
- [fuzzyStringEqual](utils.md#fuzzystringequal)
- [getContrastColor](utils.md#getcontrastcolor)
- [getFluentIcon](utils.md#getfluenticon)
- [getFluentIconWithFallback](utils.md#getfluenticonwithfallback)
- [getFluentIcons](utils.md#getfluenticons)
- [getSum](utils.md#getsum)
- [loadScripts](utils.md#loadscripts)
- [mapProperty](utils.md#mapproperty)
- [mergeMaps](utils.md#mergemaps)
- [omitDeep](utils.md#omitdeep)
- [omitTypename](utils.md#omittypename)
- [searchObject](utils.md#searchobject)
- [sleep](utils.md#sleep)
- [sortAlphabetically](utils.md#sortalphabetically)
- [t9r](utils.md#t9r)
- [tryParseJson](utils.md#tryparsejson)

## Type aliases

### FluentIconName

Ƭ **FluentIconName**: keyof *typeof* iconCatalog

Represents the name of a Fluent UI icon.

Defined in: [client/utils/getFluentIcon.tsx:418](https://github.com/Puzzlepart/did/blob/dev/client/utils/getFluentIcon.tsx#L418)

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

▸ **arrayMap**<T, R\>(`arr`: T[], `callbackfn`: (`value`: T, `index`: *number*) => R): R[]

Array map that removes falsy values.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`R` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arr` | T[] | Array   |
`callbackfn` | (`value`: T, `index`: *number*) => R | Map callback function    |

**Returns:** R[]

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

### convertToMap

▸ **convertToMap**<KeyType\>(`object`: *Record*<string, any\>): *Map*<KeyType, any\>

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

Defined in: [client/utils/convertToMap.ts:6](https://github.com/Puzzlepart/did/blob/dev/client/utils/convertToMap.ts#L6)

___

### createColumnDef

▸ **createColumnDef**<T\>(`fieldName`: *string*, `name?`: *string*, `props?`: *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)<T\>\>, `onRender?`: (`item?`: T, `index?`: *number*, `column?`: [*IListColumn*](../interfaces/components.ilistcolumn.md)) => *any*, `minWidth?`: *number*): [*IListColumn*](../interfaces/components.ilistcolumn.md)

Creates a column definition for the `List` component.
This is a helper function to make it easier to create
column definitions.

#### Type parameters:

Name | Type | Default |
:------ | :------ | :------ |
`T` | *object* | *any* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`fieldName` | *string* | - | Field name for the column   |
`name` | *string* | '' | -Name for the column   |
`props` | *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)<T\>\> | - | Additional props   |
`onRender?` | (`item?`: T, `index?`: *number*, `column?`: [*IListColumn*](../interfaces/components.ilistcolumn.md)) => *any* | - | Render function   |
`minWidth` | *number* | 100 | Min width    |

**Returns:** [*IListColumn*](../interfaces/components.ilistcolumn.md)

Defined in: [client/utils/createColumnDef.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/utils/createColumnDef.ts#L15)

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

### createRouterLink

▸ **createRouterLink**(`linkTemplate`: *string*, `variables`: *object*): *string*

Creates a router link by replacing variables in a link template with their corresponding values.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`linkTemplate` | *string* | The link template with variables to replace.   |
`variables` | *object* | An object containing key-value pairs of variable names and their corresponding values.    |

**Returns:** *string*

The router link with variables replaced and converted to lowercase.

Defined in: [client/utils/createRouterLink.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/utils/createRouterLink.ts#L11)

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

### fuzzyMap

▸ **fuzzyMap**<T, R\>(`obj`: *FuzzyMapObjectType*<T\>, `callbackFunction`: *FuzzyMapCallbackFunction*<T, R\>): R[]

Maps over an array or object and returns a new array with the results of calling a provided function on every element.
The provided function can be used to filter out unwanted elements by returning a falsy value.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | - |
`R` | T |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | *FuzzyMapObjectType*<T\> | The array or object to map over.    |
`callbackFunction` | *FuzzyMapCallbackFunction*<T, R\> | The function to call on each element.    |

**Returns:** R[]

Defined in: [client/utils/fuzzyMap.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/utils/fuzzyMap.ts#L19)

___

### fuzzyStringEqual

▸ **fuzzyStringEqual**(`a?`: *string*, `b?`: *string*): *boolean*

Compares two strings for equality, ignoring non-alphanumeric characters and case.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`a` | *string* | '' | The first string to compare.   |
`b` | *string* | '' | The second string to compare.    |

**Returns:** *boolean*

True if the strings are equal, false otherwise.

Defined in: [client/utils/fuzzyStringEqual.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/fuzzyStringEqual.ts#L9)

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

### getFluentIcon

▸ **getFluentIcon**(`name`: [*FluentIconName*](utils.md#fluenticonname), `bundle?`: *boolean*, `color?`: *string*, `size?`: *number*): *Element*

Returns the Fluent icon with the specified name.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`name` | [*FluentIconName*](utils.md#fluenticonname) | - | The name of the icon to retrieve.   |
`bundle` | *boolean* | true | Whether to bundle the filled and regular versions of the icon. Defaults to true.   |
`color?` | *string* | - | The color to apply to the icon.   |
`size?` | *number* | - | The size of the icon.    |

**Returns:** *Element*

The specified Fluent icon.

Defined in: [client/utils/getFluentIcon.tsx:430](https://github.com/Puzzlepart/did/blob/dev/client/utils/getFluentIcon.tsx#L430)

___

### getFluentIconWithFallback

▸ **getFluentIconWithFallback**(`name`: *string*, `bundleWithFilled?`: *boolean*, `color?`: *string*): *Element*

Returns a Fluent UI icon component with fallback to a an icon from `@fluentui/react`.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`name` | *string* | - | The name of the icon to retrieve.   |
`bundleWithFilled` | *boolean* | true | Whether to bundle the icon with the filled version. Defaults to true.   |
`color?` | *string* | - | The color of the icon.    |

**Returns:** *Element*

A Fluent UI icon component or a default icon component if the requested icon is not found.

Defined in: [client/utils/getFluentIcon.tsx:472](https://github.com/Puzzlepart/did/blob/dev/client/utils/getFluentIcon.tsx#L472)

___

### getFluentIcons

▸ **getFluentIcons**(): { `hasFilledIcon`: *boolean* = !!iconCatalog[key].filled; `name`: *string*  }[]

Returns an array of strings representing the names of all available Fluent icons.

**Returns:** { `hasFilledIcon`: *boolean* = !!iconCatalog[key].filled; `name`: *string*  }[]

An array of strings representing the names of all available Fluent icons.

Defined in: [client/utils/getFluentIcon.tsx:456](https://github.com/Puzzlepart/did/blob/dev/client/utils/getFluentIcon.tsx#L456)

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

### mapProperty

▸ **mapProperty**<T, R\>(`array`: T[], `property`: keyof T): R[]

Returns an array of values for a given property of an array of objects.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | - |
`R` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`array` | T[] | The array of objects to map.   |
`property` | keyof T | The property to map from each object in the array.    |

**Returns:** R[]

An array of values for the given property.

Defined in: [client/utils/mapProperty.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/mapProperty.ts#L9)

___

### mergeMaps

▸ **mergeMaps**<T\>(...`maps`: *Map*<string, T\>[]): *Map*<string, T\>

Merges multiple maps into a single map.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...maps` | *Map*<string, T\>[] | The maps to merge.    |

**Returns:** *Map*<string, T\>

A new map containing all the entries from the input maps.

Defined in: [client/utils/mergeMaps.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/utils/mergeMaps.ts#L8)

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

### t9r

▸ **t9r**(`template`: *string*, `interpolations`: *Record*<string, any\>): *string*

Replace tokens in a template string with values from an object. Tokens are
in the form of {{ token }}.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`template` | *string* | Template string with tokens in the form of {{ token }}   |
`interpolations` | *Record*<string, any\> | Object with keys matching the tokens in the template    |

**Returns:** *string*

Defined in: [client/utils/t9r.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/utils/t9r.ts#L9)

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
