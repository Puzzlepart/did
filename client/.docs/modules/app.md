[did-client - v0.9.11](../README.md) / App

# Module: App

The App component

## Table of contents

### Classes

- [ContextUser](../classes/app.contextuser.md)

### Interfaces

- [IAppContext](../interfaces/app.iappcontext.md)

### Function Component Variables

- [MobileBreadcrumb](app.md#mobilebreadcrumb)
- [Navigation](app.md#navigation)

### App Variables

- [App](app.md#app)
- [AppRouter](app.md#approuter)

### Other Variables

- [AppContext](app.md#appcontext)

### Function Component Functions

- [ErrorFallback](app.md#errorfallback)

### Other Functions

- [useAppContext](app.md#useappcontext)

## Function Component Variables

### MobileBreadcrumb

• `Const` **MobileBreadcrumb**: *React.FC*<IMobileBreadcrumbProps\>

Defined in: [app/MobileBreadcrumb/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/app/MobileBreadcrumb/index.tsx#L14)

___

### Navigation

• `Const` **Navigation**: React.FC

Defined in: [app/Navigation/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/app/Navigation/index.tsx#L14)

___

## App Variables

### App

• `Const` **App**: *React.FC*<IAppProps\>

App

Defined in: [app/index.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/app/index.tsx#L22)

___

### AppRouter

• `Const` **AppRouter**: React.FC

App router

Defined in: [app/AppRouter.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/app/AppRouter.tsx#L28)

___

## Other Variables

### AppContext

• `Const` **AppContext**: *Context*<[*IAppContext*](../interfaces/app.iappcontext.md)\>

Defined in: [app/context.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L30)

## Function Component Functions

### ErrorFallback

▸ `Const`**ErrorFallback**(`__namedParameters`: IErrorFallbackProps): *Element*

Error fallback for `<ErrorBoundary />`  from
`react-error-boundary`

Shows the `error` message and provides two
buttons. One that redirects the user to
GitHub to create a new **bug** and one that
executes `resetErrorBoundary` that might
temporarily solve the issue.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IErrorFallbackProps |

**Returns:** *Element*

Defined in: [app/ErrorFallback/index.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/app/ErrorFallback/index.tsx#L40)

___

## Other Functions

### useAppContext

▸ **useAppContext**(): [*IAppContext*](../interfaces/app.iappcontext.md)

Returns app context

**Returns:** [*IAppContext*](../interfaces/app.iappcontext.md)

Defined in: [app/context.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L35)
