[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / ValidatorFunction

# Interface: ValidatorFunction<V\>

[Components](../modules/components.md).ValidatorFunction

## Type parameters

Name | Default |
:------ | :------ |
`V` | *any* |

## Hierarchy

* *BaseValidatorFunction*<[*ValidationResult*](../modules/components.md#validationresult), V\>

  ↳ **ValidatorFunction**

## Callable

▸ **ValidatorFunction**(`value`: V, `field?`: [*FormInputControlBase*](components.forminputcontrolbase.md)<[*BaseControlOptions*](../modules/components.md#basecontroloptions), string\>): [*ValidationResult*](../modules/components.md#validationresult)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | V |
`field?` | [*FormInputControlBase*](components.forminputcontrolbase.md)<[*BaseControlOptions*](../modules/components.md#basecontroloptions), string\> |

**Returns:** [*ValidationResult*](../modules/components.md#validationresult)

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L21)

## Table of contents

### Properties

- [isAsync](components.validatorfunction.md#isasync)

## Properties

### isAsync

• `Optional` **isAsync**: *false*

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L28)
