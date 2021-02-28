[did-server - v0.10.0](../README.md) / utils

# Module: utils

## Table of contents

### References

- [getEnvironmentVariable](utils.md#getenvironmentvariable)

### Functions

- [firstPart](utils.md#firstpart)
- [stripHtmlString](utils.md#striphtmlstring)

## References

### getEnvironmentVariable

Renames and exports: [default](utils_environment.md#default)

## Functions

### firstPart

▸ **firstPart**(`string_?`: *string*, `separarator?`: *string*): *string*

Get first part in the the string separated by separarator

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`string_` | *string* | '' | String   |
`separarator` | *string* | ' ' | Separator, defaults to space    |

**Returns:** *string*

Defined in: [server/utils/firstPart.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/utils/firstPart.ts#L9)

___

### stripHtmlString

▸ **stripHtmlString**(`string`: *string*): *string*

Strip html from string using string-strip-html
Used when fetching events from ms graph
Strips the html from event body

#### Parameters:

Name | Type |
:------ | :------ |
`string` | *string* |

**Returns:** *string*

Defined in: [server/utils/stripHtmlString.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/utils/stripHtmlString.ts#L10)
