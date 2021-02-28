[did-client - v0.10.0](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### Type aliases

- [UsePermissionsOptions](hooks.md#usepermissionsoptions)

### Other Functions

- [usePermissions](hooks.md#usepermissions)

### React Hook Functions

- [useBrowserStorage](hooks.md#usebrowserstorage)
- [useExcelExport](hooks.md#useexcelexport)
- [useNotificationsQuery](hooks.md#usenotificationsquery)

## Type aliases

### UsePermissionsOptions

Ƭ **UsePermissionsOptions**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`permissionIds`? | *string*[] |

Defined in: [client/hooks/user/usePermissions.ts:7](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/usePermissions.ts#L7)

## Other Functions

### usePermissions

▸ **usePermissions**(`__namedParameters?`: [*UsePermissionsOptions*](hooks.md#usepermissionsoptions)): *object*

Permissions hook

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*UsePermissionsOptions*](hooks.md#usepermissionsoptions) |

**Returns:** *object*

Name | Type |
:------ | :------ |
`hasPermission` | (`permission`: [*PERMISSION*](../enums/configuration.permission.md)) => *boolean* |
`permissions` | IPermission[] |

Permissions available based on specified permissionIds
and a function hasPermission that checks if the currently logged
on user has the specified permission.

Defined in: [client/hooks/user/usePermissions.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/usePermissions.ts#L18)

___

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

### useExcelExport

▸ **useExcelExport**(`__namedParameters`: IUseExcelExportOptions): *object*

Excel export hook

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IUseExcelExportOptions |

**Returns:** *object*

Name | Type |
:------ | :------ |
`onExport` | () => *Promise*<void\> |

Defined in: [client/hooks/excel/useExcelExport.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/hooks/excel/useExcelExport.ts#L20)

___

### useNotificationsQuery

▸ **useNotificationsQuery**(`user`: ContextUser, `fetchPolicy?`: FetchPolicy): *object*

Notificatins query hook

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`user` | ContextUser | - | Context user    |
`fetchPolicy` | FetchPolicy | 'cache-first' | - |

**Returns:** *object*

Name | Type |
:------ | :------ |
`notifications` | Notification[] |
`refetch` | (`delay?`: *number*) => *void* |

Defined in: [client/hooks/notifications/useNotificationsQuery.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/hooks/notifications/useNotificationsQuery.ts#L16)
