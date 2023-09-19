[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / InputControlOptions

# Interface: InputControlOptions

[Components](../modules/components.md).InputControlOptions

## Hierarchy

* [*BaseControlOptions*](../modules/components.md#basecontroloptions)

  ↳ **InputControlOptions**

## Table of contents

### Properties

- [casing](components.inputcontroloptions.md#casing)
- [replace](components.inputcontroloptions.md#replace)
- [validators](components.inputcontroloptions.md#validators)

## Properties

### casing

• `Optional` **casing**: *upper* \| *lower* \| *capitalized*

Force value casing

Defined in: [client/components/FormControl/InputControl/types.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/types.tsx#L8)

___

### replace

• `Optional` **replace**: [*RegExp*, *string*]

Regex replacer

Defined in: [client/components/FormControl/InputControl/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/types.tsx#L13)

___

### validators

• `Optional` **validators**: *string* \| ([*ValidatorFunction*](components.validatorfunction.md)<any\> \| [*AsyncValidatorFunction*](components.asyncvalidatorfunction.md)<any\> \| ValidatorObject)[]

A collection of validator functions and/or objects that can be used to validate the control's value.
If a function is provided, it should return a `CustomValidatorResult`.
If an object is provided, it can specify a minimum length, a regular expression, and a validation state.

**`param`** The value to validate.

Inherited from: void

Defined in: [client/components/FormControl/types/BaseControlOptions.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/BaseControlOptions.ts#L79)
