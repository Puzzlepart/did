[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / DropdownControlOptions

# Interface: DropdownControlOptions

[Components](../modules/components.md).DropdownControlOptions

Options for the DropdownControl component.

## Hierarchy

* [*BaseControlOptions*](../modules/components.md#basecontroloptions)

  ↳ **DropdownControlOptions**

## Table of contents

### Properties

- [preTransformValue](components.dropdowncontroloptions.md#pretransformvalue)
- [validators](components.dropdowncontroloptions.md#validators)

## Properties

### preTransformValue

• `Optional` **preTransformValue**: (`data`: { `optionText`: *string* ; `optionValue`: *string*  }) => *void*

A function to transform the selected value before it is submitted.

**`param`** The data to transform.

#### Type declaration:

▸ (`data`: { `optionText`: *string* ; `optionValue`: *string*  }): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *object* |
`data.optionText` | *string* |
`data.optionValue` | *string* |

**Returns:** *void*

Defined in: [client/components/FormControl/DropdownControl/types.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/DropdownControl/types.tsx#L14)

Defined in: [client/components/FormControl/DropdownControl/types.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/DropdownControl/types.tsx#L14)

___

### validators

• `Optional` **validators**: *string* \| ([*ValidatorFunction*](components.validatorfunction.md)<any\> \| [*AsyncValidatorFunction*](components.asyncvalidatorfunction.md)<any\> \| ValidatorObject)[]

A collection of validator functions and/or objects that can be used to validate the control's value.
If a function is provided, it should return a `CustomValidatorResult`.
If an object is provided, it can specify a minimum length, a regular expression, and a validation state.

**`param`** The value to validate.

Inherited from: void

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L79)
