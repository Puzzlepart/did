[did-client - v0.10.0](../README.md) / Helpers

# Module: Helpers

Reusable helper functions

## Table of contents

### Functions

- [getValue](helpers.md#getvalue)
- [setValue](helpers.md#setvalue)
- [sortAlphabetically](helpers.md#sortalphabetically)

## Functions

### getValue

▸ **getValue**<T\>(`obj`: *any*, `exp`: *string*, `defaultValue?`: T): T

Get value from object using get-value

**`see`** https://www.npmjs.com/package/get-value

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | *any* | Obj   |
`exp` | *string* | Expression   |
`defaultValue?` | T | Default value    |

**Returns:** T

Defined in: [client/helpers/index.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/helpers/index.ts#L19)

___

### setValue

▸ **setValue**<T\>(`obj`: *any*, `exp`: *string*, `value?`: T): *any*

Set value in object using set-value

**`see`** https://www.npmjs.com/package/set-value

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | *any* | Obj   |
`exp` | *string* | Expression   |
`value?` | T | - |

**Returns:** *any*

Defined in: [client/helpers/index.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/helpers/index.ts#L32)

___

### sortAlphabetically

▸ **sortAlphabetically**(`strArray`: *string*[]): *string*[]

Sort alphabetically

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`strArray` | *string*[] | Array of strings to sort alphabetically    |

**Returns:** *string*[]

Defined in: [client/helpers/index.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/helpers/index.ts#L41)
