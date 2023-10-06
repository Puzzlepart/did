[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / ISubmitProps

# Interface: ISubmitProps

[Components](../modules/components.md).ISubmitProps

## Hierarchy

* *Pick*<ButtonProps, *onClick* \| *disabled*\>

  ↳ **ISubmitProps**

## Table of contents

### Properties

- [onSave](components.isubmitprops.md#onsave)
- [text](components.isubmitprops.md#text)
- [toast](components.isubmitprops.md#toast)

## Properties

### onSave

• `Optional` **onSave**: (`model`: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>) => *void*

On save callback with the model passed as an argument.

**`param`** The model used by the form control.

#### Type declaration:

▸ (`model`: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`model` | [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\> |

**Returns:** *void*

Defined in: [client/components/FormControl/types/ISubmitProps.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/ISubmitProps.ts#L22)

Defined in: [client/components/FormControl/types/ISubmitProps.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/ISubmitProps.ts#L22)

___

### text

• **text**: *string*

Text to show on the submit button.

Defined in: [client/components/FormControl/types/ISubmitProps.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/ISubmitProps.ts#L10)

___

### toast

• `Optional` **toast**: [*IUserMessageProps*](components.iusermessageprops.md)

Toast props

Defined in: [client/components/FormControl/types/ISubmitProps.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/ISubmitProps.ts#L15)
