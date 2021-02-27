[did-server](../README.md) / utils

# Module: utils

## Table of contents

### References

- [getEnvironmentVariable](utils.md#getenvironmentvariable)

### Functions

- [stripHtmlString](utils.md#striphtmlstring)

## References

### getEnvironmentVariable

Renames and exports: [default](utils_env.md#default)

## Functions

### stripHtmlString

▸ **stripHtmlString**(`str`: *string*): *string*

Strip html from string using string-strip-html
Used when fetching events from ms graph
Strips the html from event body

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | String    |

**Returns:** *string*

Defined in: [server/utils/stripHtmlString.ts:10](https://github.com/Puzzlepart/did/blob/1b47620b/server/utils/stripHtmlString.ts#L10)
