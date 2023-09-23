[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / FormInputControlBase

# Interface: FormInputControlBase<TOptions, KeyType\>

[Components](../modules/components.md).FormInputControlBase

## Type parameters

Name | Type | Default |
:------ | :------ | :------ |
`TOptions` | [*BaseControlOptions*](../modules/components.md#basecontroloptions) | [*BaseControlOptions*](../modules/components.md#basecontroloptions) |
`KeyType` | - | *string* |

## Hierarchy

* [*IFieldProps*](components.ifieldprops.md)<KeyType\>

  ↳ **FormInputControlBase**

  ↳↳ [*IAutocompleteControlProps*](components.iautocompletecontrolprops.md)

  ↳↳ [*ICheckboxControlProps*](components.icheckboxcontrolprops.md)

  ↳↳ [*IDropdownControlProps*](components.idropdowncontrolprops.md)

  ↳↳ [*IInputControlProps*](components.iinputcontrolprops.md)

## Table of contents

### Properties

- [description](components.forminputcontrolbase.md#description)
- [errorMessage](components.forminputcontrolbase.md#errormessage)
- [id](components.forminputcontrolbase.md#id)
- [label](components.forminputcontrolbase.md#label)
- [labelProps](components.forminputcontrolbase.md#labelprops)
- [model](components.forminputcontrolbase.md#model)
- [name](components.forminputcontrolbase.md#name)
- [options](components.forminputcontrolbase.md#options)
- [required](components.forminputcontrolbase.md#required)

## Properties

### description

• `Optional` **description**: *string*

The description for the field.

Inherited from: [IFieldProps](components.ifieldprops.md).[description](components.ifieldprops.md#description)

Defined in: [client/components/FormControl/Field/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L30)

___

### errorMessage

• `Optional` **errorMessage**: *string*

The error message for the field. Will be rendered using
the `UserMessage` component with `intent` set to `error`.

Inherited from: [IFieldProps](components.ifieldprops.md).[errorMessage](components.ifieldprops.md#errormessage)

Defined in: [client/components/FormControl/Field/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L41)

___

### id

• `Optional` **id**: *string*

Control ID for the field to store on the HTML element.

Inherited from: [IFieldProps](components.ifieldprops.md).[id](components.ifieldprops.md#id)

Defined in: [client/components/FormControl/Field/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L20)

___

### label

• `Optional` **label**: *string*

The label for the field.

Inherited from: [IFieldProps](components.ifieldprops.md).[label](components.ifieldprops.md#label)

Defined in: [client/components/FormControl/Field/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L25)

___

### labelProps

• `Optional` **labelProps**: *IFieldLabelProps*

Label properties

Inherited from: [IFieldProps](components.ifieldprops.md).[labelProps](components.ifieldprops.md#labelprops)

Defined in: [client/components/FormControl/Field/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L46)

___

### model

• `Optional` **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

Automatically bind the text control to
a model. A model is generated using the
`useMap` hook.

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L14)

___

### name

• `Optional` **name**: KeyType

The `name` attribute is required for the Form Control
to work properly.

Inherited from: [IFieldProps](components.ifieldprops.md).[name](components.ifieldprops.md#name)

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### options

• `Optional` **options**: TOptions

Control options

- `casing` - force value casing

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L21)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: [IFieldProps](components.ifieldprops.md).[required](components.ifieldprops.md#required)

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)
