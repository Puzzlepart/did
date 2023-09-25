[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IRadioGroupControlProps

# Interface: IRadioGroupControlProps

[Components](../modules/components.md).IRadioGroupControlProps

Props for the RadioGroupControl component.

## Hierarchy

* [*FormInputControlBase*](components.forminputcontrolbase.md)<{}\>

* *Pick*<RadioGroupProps, *name*\>

  ↳ **IRadioGroupControlProps**

## Table of contents

### Properties

- [description](components.iradiogroupcontrolprops.md#description)
- [errorMessage](components.iradiogroupcontrolprops.md#errormessage)
- [id](components.iradiogroupcontrolprops.md#id)
- [label](components.iradiogroupcontrolprops.md#label)
- [labelProps](components.iradiogroupcontrolprops.md#labelprops)
- [model](components.iradiogroupcontrolprops.md#model)
- [name](components.iradiogroupcontrolprops.md#name)
- [options](components.iradiogroupcontrolprops.md#options)
- [required](components.iradiogroupcontrolprops.md#required)
- [values](components.iradiogroupcontrolprops.md#values)

## Properties

### description

• `Optional` **description**: *string*

The description for the field.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[description](components.forminputcontrolbase.md#description)

Defined in: [client/components/FormControl/Field/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L30)

___

### errorMessage

• `Optional` **errorMessage**: *string*

The error message for the field. Will be rendered using
the `UserMessage` component with `intent` set to `error`.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[errorMessage](components.forminputcontrolbase.md#errormessage)

Defined in: [client/components/FormControl/Field/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L41)

___

### id

• `Optional` **id**: *string*

Control ID for the field to store on the HTML element.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[id](components.forminputcontrolbase.md#id)

Defined in: [client/components/FormControl/Field/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L20)

___

### label

• `Optional` **label**: *string*

The label for the field.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[label](components.forminputcontrolbase.md#label)

Defined in: [client/components/FormControl/Field/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L25)

___

### labelProps

• `Optional` **labelProps**: *IFieldLabelProps*

Label properties

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[labelProps](components.forminputcontrolbase.md#labelprops)

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

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[name](components.forminputcontrolbase.md#name)

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### options

• `Optional` **options**: *object*

Control options

- `casing` - force value casing

#### Type declaration:

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[options](components.forminputcontrolbase.md#options)

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L21)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[required](components.forminputcontrolbase.md#required)

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)

___

### values

• **values**: RadioProps[]

An array of options to display in the dropdown. Specify an array
of objects with `value` and `text` properties.

Defined in: [client/components/FormControl/RadioGroupControl/types.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/RadioGroupControl/types.tsx#L15)
