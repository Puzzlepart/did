[did-client - v0.11.0](../README.md) / App

# Module: App

The App component

## Table of contents

### Classes

- [ContextUser](../classes/app.contextuser.md)

### Interfaces

- [IAppContext](../interfaces/app.iappcontext.md)

### App Variables

- [App](app.md#app)

### Other Variables

- [AppContext](app.md#appcontext)

### Functions

- [useAppContext](app.md#useappcontext)

## App Variables

### App

• `Const` **App**: *FC*<IAppProps\>

App

Defined in: [client/app/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/app/index.tsx#L18)

___

## Other Variables

### AppContext

• `Const` **AppContext**: *Context*<[*IAppContext*](../interfaces/app.iappcontext.md)\>

Defined in: [client/app/context.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L42)

## Functions

### useAppContext

▸ **useAppContext**(): [*IAppContext*](../interfaces/app.iappcontext.md)

Returns the current context value for the app.

Uses `useContext` with `AppContext`

**Returns:** [*IAppContext*](../interfaces/app.iappcontext.md)

`IAppContext`

Defined in: [client/app/context.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L51)
