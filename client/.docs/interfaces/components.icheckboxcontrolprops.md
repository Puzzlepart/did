[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / ICheckboxControlProps

# Interface: ICheckboxControlProps

[Components](../modules/components.md).ICheckboxControlProps

## Hierarchy

* [*FormInputControlBase*](components.forminputcontrolbase.md)<[*BaseControlOptions*](../modules/components.md#basecontroloptions)\>

* [*IFieldProps*](components.ifieldprops.md)

  ↳ **ICheckboxControlProps**

## Table of contents

### Properties

- [description](components.icheckboxcontrolprops.md#description)
- [errorMessage](components.icheckboxcontrolprops.md#errormessage)
- [id](components.icheckboxcontrolprops.md#id)
- [label](components.icheckboxcontrolprops.md#label)
- [labelProps](components.icheckboxcontrolprops.md#labelprops)
- [model](components.icheckboxcontrolprops.md#model)
- [name](components.icheckboxcontrolprops.md#name)
- [options](components.icheckboxcontrolprops.md#options)
- [required](components.icheckboxcontrolprops.md#required)

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

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[model](components.forminputcontrolbase.md#model)

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L14)

___

### name

• `Optional` **name**: *string*

The `name` attribute is required for the Form Control
to work properly.

Inherited from: [IFieldProps](components.ifieldprops.md).[name](components.ifieldprops.md#name)

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### options

• `Optional` **options**: [*BaseControlOptions*](../modules/components.md#basecontroloptions)

Control options

- `casing` - force value casing

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[options](components.forminputcontrolbase.md#options)

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L21)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: [IFieldProps](components.ifieldprops.md).[required](components.ifieldprops.md#required)

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)
