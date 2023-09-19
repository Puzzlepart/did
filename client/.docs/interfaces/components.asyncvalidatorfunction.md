[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / AsyncValidatorFunction

# Interface: AsyncValidatorFunction<V\>

[Components](../modules/components.md).AsyncValidatorFunction

## Type parameters

Name | Default |
:------ | :------ |
`V` | *any* |

## Hierarchy

* *BaseValidatorFunction*<Promise<[*ValidationResult*](../modules/components.md#validationresult)\>, V\>

  ↳ **AsyncValidatorFunction**

## Callable

▸ **AsyncValidatorFunction**(`value`: V, `field?`: [*FormInputControlBase*](components.forminputcontrolbase.md)<[*BaseControlOptions*](../modules/components.md#basecontroloptions), string\>): *Promise*<[*ValidationResult*](../modules/components.md#validationresult)\>

#### Parameters:

Name | Type |
:------ | :------ |
`value` | V |
`field?` | [*FormInputControlBase*](components.forminputcontrolbase.md)<[*BaseControlOptions*](../modules/components.md#basecontroloptions), string\> |

**Returns:** *Promise*<[*ValidationResult*](../modules/components.md#validationresult)\>

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L21)

## Table of contents

### Properties

- [isAsync](components.asyncvalidatorfunction.md#isasync)

## Properties

### isAsync

• **isAsync**: *true*

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L33)
