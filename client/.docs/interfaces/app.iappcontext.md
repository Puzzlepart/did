[did-client - v0.9.11](../README.md) / [App](../modules/app.md) / IAppContext

# Interface: IAppContext

[App](../modules/app.md).IAppContext

## Hierarchy

* *IAppProps*

  ↳ **IAppContext**

## Table of contents

### Properties

- [authProviders](app.iappcontext.md#authproviders)
- [dispatch](app.iappcontext.md#dispatch)
- [notifications](app.iappcontext.md#notifications)
- [pages](app.iappcontext.md#pages)
- [state](app.iappcontext.md#state)
- [subscription](app.iappcontext.md#subscription)
- [user](app.iappcontext.md#user)

## Properties

### authProviders

• `Optional` **authProviders**: *string*[]

Auth providers

Inherited from: void

Defined in: [app/types.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L19)

___

### dispatch

• `Optional` **dispatch**: *Dispatch*<AnyAction\>

Application dispatcher

Defined in: [app/context.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L27)

___

### notifications

• `Optional` **notifications**: NotificationsQuery

Notifications query

Defined in: [app/context.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L17)

___

### pages

• `Optional` **pages**: *PageComponent*[]

Pages

Defined in: [app/context.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L12)

___

### state

• `Optional` **state**: IAppState

Application state

Defined in: [app/context.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L22)

___

### subscription

• `Optional` **subscription**: *Subscription*

Subscription

Inherited from: void

Defined in: [app/types.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L14)

___

### user

• `Optional` **user**: [*ContextUser*](../classes/app.contextuser.md)

The currently logged in user

Inherited from: void

Defined in: [app/types.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L9)
