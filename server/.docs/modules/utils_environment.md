[did-server - v0.9.9](../README.md) / utils/environment

# Module: utils/environment

## Table of contents

### Functions

- [environment](utils_environment.md#environment)

## Functions

### environment

▸ **environment**<T\>(`key`: *string*, `fallbackValue?`: *string*, `options?`: EnvironmentParseOptions): T

Get environment variable by key with optional fallbackvalue

Makes it easier to work with process.env.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *string* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Key   |
`fallbackValue?` | *string* | Fallback vaue if key is not found   |
`options` | EnvironmentParseOptions | options    |

**Returns:** T

Defined in: [server/utils/environment.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/utils/environment.ts#L16)
