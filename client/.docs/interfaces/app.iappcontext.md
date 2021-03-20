[did-client - v0.9.11](../README.md) / [App](../modules/app.md) / IAppContext

# Interface: IAppContext

[App](../modules/app.md).IAppContext

## Table of contents

### Properties

- [authProviders](app.iappcontext.md#authproviders)
- [notificationsQuery](app.iappcontext.md#notificationsquery)
- [state](app.iappcontext.md#state)
- [subscription](app.iappcontext.md#subscription)
- [user](app.iappcontext.md#user)

## Properties

### authProviders

• `Optional` **authProviders**: *string*[]

Auth providers

Defined in: client/app/context.ts:30

___

### notificationsQuery

• `Optional` **notificationsQuery**: *object*

Notifications query

#### Type declaration:

Name | Type |
:------ | :------ |
`notifications` | *Notification*[] |
`refetch` | (`delay?`: *number*) => *void* |

Defined in: client/app/context.ts:25

___

### state

• `Optional` **state**: *object*

Application state

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`_current` | [*IAppState*](app.iappstate.md) | The current `state` of the application   |
`set` | (`state`: [*IAppState*](app.iappstate.md)) => *void* | Function to set the application `state`   |

Defined in: client/app/context.ts:35

___

### subscription

• `Optional` **subscription**: *Subscription*

Subscription

Defined in: client/app/context.ts:20

___

### user

• `Optional` **user**: [*ContextUser*](../classes/app.contextuser.md)

The currently logged in user

Defined in: client/app/context.ts:15
