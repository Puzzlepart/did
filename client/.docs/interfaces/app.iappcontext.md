[did-client - v0.11.5](../README.md) / [App](../modules/app.md) / IAppContext

# Interface: IAppContext

[App](../modules/app.md).IAppContext

## Hierarchy

* *IAppProps*

  ↳ **IAppContext**

## Table of contents

### Properties

- [authProviders](app.iappcontext.md#authproviders)
- [dispatch](app.iappcontext.md#dispatch)
- [getUserConfiguration](app.iappcontext.md#getuserconfiguration)
- [isAuthenticated](app.iappcontext.md#isauthenticated)
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

Defined in: [app/context.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L28)

___

### getUserConfiguration

• **getUserConfiguration**: <T\>(`path`: *string*) => T

Get user configuration

#### Type declaration:

▸ <T\>(`path`: *string*): T

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`path` | *string* |

**Returns:** T

Defined in: [app/context.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L38)

Defined in: [app/context.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L38)

___

### isAuthenticated

• `Optional` **isAuthenticated**: *boolean*

Is authenticated

Defined in: [app/context.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L33)

___

### notifications

• `Optional` **notifications**: NotificationsQuery

Notifications query

Defined in: [app/context.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L18)

___

### pages

• `Optional` **pages**: *PageComponent*[]

Pages

Defined in: [app/context.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L13)

___

### state

• `Optional` **state**: IAppState

Application state

Defined in: [app/context.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/app/context.ts#L23)

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
