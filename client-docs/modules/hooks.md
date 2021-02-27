[did-client - v0.10.0](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### React Hook Functions

- [useBrowserStorage](hooks.md#usebrowserstorage)
- [useNotificationsQuery](hooks.md#usenotificationsquery)

## React Hook Functions

### useBrowserStorage

▸ **useBrowserStorage**<T\>(`__namedParameters`: *Object*): [T, (`value`: *any*) => *void*, () => *void*]

Browser storage hook

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** [T, (`value`: *any*) => *void*, () => *void*]

Defined in: [client/hooks/browserStorage/useBrowserStorage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/hooks/browserStorage/useBrowserStorage.ts#L10)

___

### useNotificationsQuery

▸ **useNotificationsQuery**(`user`: ContextUser): *object*

Notificatins query hook

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | ContextUser | Context user    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`notifications` | Notification[] |
`refetch` | (`delay?`: *number*) => *void* |

Defined in: [client/hooks/notifications/useNotificationsQuery.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/hooks/notifications/useNotificationsQuery.ts#L15)
