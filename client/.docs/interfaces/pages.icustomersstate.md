[did-client - v0.12.0](../README.md) / [Pages](../modules/pages.md) / ICustomersState

# Interface: ICustomersState

[Pages](../modules/pages.md).ICustomersState

The state of the Customers page.

## Table of contents

### Properties

- [customerForm](pages.icustomersstate.md#customerform)
- [customers](pages.icustomersstate.md#customers)
- [error](pages.icustomersstate.md#error)
- [projectForm](pages.icustomersstate.md#projectform)
- [selected](pages.icustomersstate.md#selected)

## Properties

### customerForm

• `Optional` **customerForm**: *ICustomerFormProps*

The form for creating/editing a customer.

Defined in: [client/pages/Customers/types.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L50)

___

### customers

• `Optional` **customers**: *Customer*[]

The list of customers.

Defined in: [client/pages/Customers/types.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L40)

___

### error

• `Optional` **error**: *any*

Any error that occurred while loading or updating the state.

Defined in: [client/pages/Customers/types.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L55)

___

### projectForm

• `Optional` **projectForm**: [*IProjectFormProps*](pages.iprojectformprops.md)

The form for creating/editing a project.

Defined in: [client/pages/Customers/types.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L45)

___

### selected

• `Optional` **selected**: *Customer*

The currently selected customer.

Defined in: [client/pages/Customers/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L35)
