[did-server - v0.9.11](../README.md) / Utils

# Module: Utils

Utility functions

## Table of contents

### Functions

- [environment](utils.md#environment)
- [firstPart](utils.md#firstpart)
- [stripHtmlString](utils.md#striphtmlstring)

## Functions

### environment

▸ **environment**<T\>(`key`: keyof Environment, `fallbackValue?`: T, `options?`: EnvironmentParseOptions): T

Get environment variable by key with optional fallback value

Makes it easier to work with `process.env` giving a type
(`Environment`) for the available environment keys

**`remarks`** Logs missing environment variables using the
[debug](https://www.npmjs.com/package/debug) module

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *string* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | keyof Environment | Key   |
`fallbackValue?` | T | Fallback vaue if key is not found   |
`options` | EnvironmentParseOptions | options    |

**Returns:** T

Defined in: [utils/environment.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/utils/environment.ts#L55)

___

### firstPart

▸ **firstPart**(`string_?`: *string*, `separarator?`: *string*): *string*

Get first part in the the string separated by separarator

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`string_` | *string* | '' | String   |
`separarator` | *string* | ' ' | Separator, defaults to space    |

**Returns:** *string*

Defined in: [utils/firstPart.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/utils/firstPart.ts#L9)

___

### stripHtmlString

▸ **stripHtmlString**(`string`: *string*): *string*

Strip html from string using [string-strip-html](https://www.npmjs.com/package/string-strip-html)

**`remarks`** Used when fetching events from Microsoft Graph
or Google Calendar

#### Parameters:

Name | Type |
:------ | :------ |
`string` | *string* |

**Returns:** *string*

Defined in: [utils/stripHtmlString.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/utils/stripHtmlString.ts#L11)
