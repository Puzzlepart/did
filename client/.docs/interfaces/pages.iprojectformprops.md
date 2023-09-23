[did-client - v0.13.0](../README.md) / [Pages](../modules/pages.md) / IProjectFormProps

# Interface: IProjectFormProps

[Pages](../modules/pages.md).IProjectFormProps

## Hierarchy

* *ITabProps*

* [*IFormControlProps*](components.iformcontrolprops.md)<Project\>

  ↳ **IProjectFormProps**

## Table of contents

### Properties

- [customerKey](pages.iprojectformprops.md#customerkey)
- [debug](pages.iprojectformprops.md#debug)
- [description](pages.iprojectformprops.md#description)
- [edit](pages.iprojectformprops.md#edit)
- [icon](pages.iprojectformprops.md#icon)
- [id](pages.iprojectformprops.md#id)
- [model](pages.iprojectformprops.md#model)
- [panelProps](pages.iprojectformprops.md#panelprops)
- [permission](pages.iprojectformprops.md#permission)
- [submitProps](pages.iprojectformprops.md#submitprops)
- [text](pages.iprojectformprops.md#text)
- [validateOnBlur](pages.iprojectformprops.md#validateonblur)

## Properties

### customerKey

• `Optional` **customerKey**: *string*

Specify the customer key to use for the project creation. The
customer field will be disabled and the customer key will be
used to create the project.

Defined in: [client/pages/Projects/ProjectForm/types.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/types.tsx#L16)

___

### debug

• `Optional` **debug**: *boolean*

Running in debug mode will show the model JSON in the bottom of the form.

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[debug](components.iformcontrolprops.md#debug)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L37)

___

### description

• `Optional` **description**: *string*

An optional description for the tab to display in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:71](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L71)

___

### edit

• `Optional` **edit**: *Project*

Model of type `T` to be edited

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[edit](components.iformcontrolprops.md#edit)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L32)

___

### icon

• `Optional` **icon**: *string*

Icon to display for the tab in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:76](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L76)

___

### id

• `Optional` **id**: *string*

An optional ID for the tab.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L61)

___

### model

• `Optional` **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

Specify the model used for the form control.

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[model](components.iformcontrolprops.md#model)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L11)

___

### panelProps

• `Optional` **panelProps**: [*IBasePanelProps*](components.ibasepanelprops.md)

Specify panel props to open the form control in
a `<Panel />`

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[panelProps](components.iformcontrolprops.md#panelprops)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L22)

___

### permission

• `Optional` **permission**: PermissionScope

Permission scope required to view the tab.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:81](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L81)

___

### submitProps

• `Optional` **submitProps**: [*ISubmitProps*](components.isubmitprops.md)

Submit  props

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[submitProps](components.iformcontrolprops.md#submitprops)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L16)

___

### text

• `Optional` **text**: *string*

An optional text for the tab to display in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L66)

___

### validateOnBlur

• `Optional` **validateOnBlur**: *boolean*

Enable validation on blur

Inherited from: [IFormControlProps](components.iformcontrolprops.md).[validateOnBlur](components.iformcontrolprops.md#validateonblur)

Defined in: [client/components/FormControl/types/IFormControlProps.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/IFormControlProps.ts#L27)
