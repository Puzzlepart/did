[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IFormControlProps

# Interface: IFormControlProps<T\>

[Components](../modules/components.md).IFormControlProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* *Omit*<HTMLAttributes<HTMLDivElement\>, *onSubmit*\>

  ↳ **IFormControlProps**

  ↳↳ [*IProjectFormProps*](pages.iprojectformprops.md)

## Table of contents

### Properties

- [debug](components.iformcontrolprops.md#debug)
- [edit](components.iformcontrolprops.md#edit)
- [model](components.iformcontrolprops.md#model)
- [panelProps](components.iformcontrolprops.md#panelprops)
- [submitProps](components.iformcontrolprops.md#submitprops)
- [validateOnBlur](components.iformcontrolprops.md#validateonblur)

## Properties

### debug

• `Optional` **debug**: *boolean*

Running in debug mode will show the model JSON in the bottom of the form.

Defined in: [client/components/FormControl/types/IFormControlProps.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L37)

___

### edit

• `Optional` **edit**: T

Model of type `T` to be edited

Defined in: [client/components/FormControl/types/IFormControlProps.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L32)

___

### model

• `Optional` **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

Specify the model used for the form control.

Defined in: [client/components/FormControl/types/IFormControlProps.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L11)

___

### panelProps

• `Optional` **panelProps**: [*IBasePanelProps*](components.ibasepanelprops.md)

Specify panel props to open the form control in
a `<Panel />`

Defined in: [client/components/FormControl/types/IFormControlProps.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L22)

___

### submitProps

• `Optional` **submitProps**: [*ISubmitProps*](components.isubmitprops.md)

Submit  props

Defined in: [client/components/FormControl/types/IFormControlProps.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L16)

___

### validateOnBlur

• `Optional` **validateOnBlur**: *boolean*

Enable validation on blur

Defined in: [client/components/FormControl/types/IFormControlProps.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L27)
