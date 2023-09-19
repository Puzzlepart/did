[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IFormControlContext

# Interface: IFormControlContext

[Components](../modules/components.md).IFormControlContext

Interface for the form control context.

## Hierarchy

* [*IFormControlState*](components.iformcontrolstate.md)

  ↳ **IFormControlContext**

## Table of contents

### Properties

- [dispatch](components.iformcontrolcontext.md#dispatch)
- [model](components.iformcontrolcontext.md#model)
- [onBlurCallback](components.iformcontrolcontext.md#onblurcallback)
- [validationMessages](components.iformcontrolcontext.md#validationmessages)

## Properties

### dispatch

• **dispatch**: *Dispatch*<AnyAction\>

The Redux dispatch function.

Defined in: [client/components/FormControl/context.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/context.ts#L17)

___

### model

• **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

The model object for the form control.

Defined in: [client/components/FormControl/context.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/context.ts#L12)

___

### onBlurCallback

• **onBlurCallback**: (`event`: *any*) => *void*

On blur callback that is called when a form control loses focus.
If enabled the field will be validated on blur.

**`param`** The blur event.

#### Type declaration:

▸ (`event`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *any* |

**Returns:** *void*

Defined in: [client/components/FormControl/context.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/context.ts#L25)

Defined in: [client/components/FormControl/context.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/context.ts#L25)

___

### validationMessages

• **validationMessages**: *Map*<string, [*ValidationResult*](../modules/components.md#validationresult)\>

The validation messages for the form control.

Inherited from: [IFormControlState](components.iformcontrolstate.md).[validationMessages](components.iformcontrolstate.md#validationmessages)

Defined in: [client/components/FormControl/types/IFormControlState.ts:7](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlState.ts#L7)
