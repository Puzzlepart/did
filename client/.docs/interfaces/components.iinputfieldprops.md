[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IInputFieldProps

# Interface: IInputFieldProps

[Components](../modules/components.md).IInputFieldProps

## Hierarchy

* *Pick*<TextareaProps, *rows* \| *value* \| *placeholder* \| *maxLength*\>

* [*IFieldProps*](components.ifieldprops.md)

  ↳ **IInputFieldProps**

## Table of contents

### Properties

- [description](components.iinputfieldprops.md#description)
- [errorMessage](components.iinputfieldprops.md#errormessage)
- [id](components.iinputfieldprops.md#id)
- [label](components.iinputfieldprops.md#label)
- [labelProps](components.iinputfieldprops.md#labelprops)
- [name](components.iinputfieldprops.md#name)
- [onBlur](components.iinputfieldprops.md#onblur)
- [onChange](components.iinputfieldprops.md#onchange)
- [required](components.iinputfieldprops.md#required)

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

### name

• `Optional` **name**: *string*

The `name` attribute is required for the Form Control
to work properly.

Inherited from: [IFieldProps](components.ifieldprops.md).[name](components.ifieldprops.md#name)

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### onBlur

• `Optional` **onBlur**: (`event`: *any*) => *void*

On blur event handler.

#### Type declaration:

▸ (`event`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *any* |

**Returns:** *void*

Defined in: [client/components/FormControl/InputControl/InputField/types.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/InputField/types.tsx#L17)

Defined in: [client/components/FormControl/InputControl/InputField/types.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/InputField/types.tsx#L17)

___

### onChange

• `Optional` **onChange**: (`event`: *ChangeEvent*<any\>, `data`: *any*) => *void*

On change event handler

#### Type declaration:

▸ (`event`: *ChangeEvent*<any\>, `data`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *ChangeEvent*<any\> |
`data` | *any* |

**Returns:** *void*

Defined in: [client/components/FormControl/InputControl/InputField/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/InputField/types.tsx#L12)

Defined in: [client/components/FormControl/InputControl/InputField/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/InputControl/InputField/types.tsx#L12)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: [IFieldProps](components.ifieldprops.md).[required](components.ifieldprops.md#required)

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)
