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
- [notificationsQuery](app.iappcontext.md#notificationsquery)
- [state](app.iappcontext.md#state)
- [subscription](app.iappcontext.md#subscription)
- [user](app.iappcontext.md#user)

## Properties

### authProviders

• `Optional` **authProviders**: *string*[]

Auth providers

Defined in: [app/types.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L19)

___

### dispatch

• `Optional` **dispatch**: *Dispatch*<AnyAction\>

Application dispatcher

Defined in: [app/context.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L21)

___

### notificationsQuery

• `Optional` **notificationsQuery**: *object*

Notifications query

#### Type declaration:

Name | Type |
:------ | :------ |
`notifications` | *Notification*[] |
`refetch` | (`delay?`: *number*) => *void* |

Defined in: [app/context.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L11)

___

### state

• `Optional` **state**: IAppState

Application state

Defined in: [app/context.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L16)

___

### subscription

• `Optional` **subscription**: *Subscription*

Subscription

Defined in: [app/types.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L14)

___

### user

• `Optional` **user**: [*ContextUser*](../classes/app.contextuser.md)

The currently logged in user

Defined in: [app/types.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/app/types.ts#L9)
