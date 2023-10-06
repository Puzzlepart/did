[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IFieldProps

# Interface: IFieldProps<KeyType\>

[Components](../modules/components.md).IFieldProps

Props for the Field component.

## Type parameters

Name | Default |
:------ | :------ |
`KeyType` | *string* |

## Hierarchy

* *Pick*<HTMLProps<HTMLDivElement\>, *className* \| *hidden* \| *onKeyDown*\>

  ↳ **IFieldProps**

  ↳↳ [*ICheckboxControlProps*](components.icheckboxcontrolprops.md)

  ↳↳ [*IInputFieldProps*](components.iinputfieldprops.md)

  ↳↳ [*FormInputControlBase*](components.forminputcontrolbase.md)

## Table of contents

### Properties

- [description](components.ifieldprops.md#description)
- [errorMessage](components.ifieldprops.md#errormessage)
- [id](components.ifieldprops.md#id)
- [label](components.ifieldprops.md#label)
- [labelProps](components.ifieldprops.md#labelprops)
- [name](components.ifieldprops.md#name)
- [required](components.ifieldprops.md#required)

## Properties

### description

• `Optional` **description**: *string*

The description for the field.

Defined in: [client/components/FormControl/Field/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L30)

___

### errorMessage

• `Optional` **errorMessage**: *string*

The error message for the field. Will be rendered using
the `UserMessage` component with `intent` set to `error`.

Defined in: [client/components/FormControl/Field/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L41)

___

### id

• `Optional` **id**: *string*

Control ID for the field to store on the HTML element.

Defined in: [client/components/FormControl/Field/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L20)

___

### label

• `Optional` **label**: *string*

The label for the field.

Defined in: [client/components/FormControl/Field/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L25)

___

### labelProps

• `Optional` **labelProps**: *IFieldLabelProps*

Label properties

Defined in: [client/components/FormControl/Field/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L46)

___

### name

• `Optional` **name**: KeyType

The `name` attribute is required for the Form Control
to work properly.

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)
