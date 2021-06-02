[did-client - v0.10.3](../README.md) / App

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

• `Const` **App**: *React.FC*<IAppProps\>

App

Defined in: [app/index.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/app/index.tsx#L19)

___

## Other Variables

### AppContext

• `Const` **AppContext**: *Context*<[*IAppContext*](../interfaces/app.iappcontext.md)\>

Defined in: [app/context.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L42)

## Functions

### useAppContext

▸ **useAppContext**(): [*IAppContext*](../interfaces/app.iappcontext.md)

Returns the current context value for the app.

Uses `useContext` with `AppContext`

**Returns:** [*IAppContext*](../interfaces/app.iappcontext.md)

`IAppContext`

Defined in: [app/context.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L51)
