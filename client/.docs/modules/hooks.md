[did-client - v0.9.11](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### React Hook Functions

- [useArray](hooks.md#usearray)
- [useBrowserStorage](hooks.md#usebrowserstorage)
- [useExcelExport](hooks.md#useexcelexport)
- [useNotificationsQuery](hooks.md#usenotificationsquery)
- [usePermissions](hooks.md#usepermissions)
- [useToggle](hooks.md#usetoggle)
- [useUpdateUserConfiguration](hooks.md#useupdateuserconfiguration)

## React Hook Functions

### useArray

▸ **useArray**<T\>(`initialValue?`: T[]): [T[], (`item`: T) => *void*, (`item`: T) => *boolean*]

Returns the current state of the array, a function
to push a new item to the array, and a function to
check if the array contains the specified item

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`initialValue` | T[] |

**Returns:** [T[], (`item`: T) => *void*, (`item`: T) => *boolean*]

Defined in: [hooks/common/useArray.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useArray.ts#L12)

___

### useBrowserStorage

▸ **useBrowserStorage**<T\>(`__namedParameters`: *Object*): [T, (`value`: *any*) => *void*, () => *void*]

Browser storage hook supporting arrays

**`remarks`** Supports arrays for now, but can
support objects, string etc in the future
if needed.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** [T, (`value`: *any*) => *void*, () => *void*]

Defined in: [hooks/browserStorage/useBrowserStorage.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/hooks/browserStorage/useBrowserStorage.ts#L14)

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

Defined in: [hooks/excel/useExcelExport.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/hooks/excel/useExcelExport.ts#L20)

___

### useNotificationsQuery

▸ **useNotificationsQuery**(`user`: [*ContextUser*](../classes/app.contextuser.md), `fetchPolicy?`: FetchPolicy): *object*

Notificatins query hook

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`user` | [*ContextUser*](../classes/app.contextuser.md) | - | Context user    |
`fetchPolicy` | FetchPolicy | 'cache-first' | - |

**Returns:** *object*

Name | Type |
:------ | :------ |
`data` | Notification[] |
`refetch` | (`delay?`: *number*) => *void* |

Defined in: [hooks/notifications/useNotificationsQuery.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/hooks/notifications/useNotificationsQuery.ts#L16)

___

### usePermissions

▸ **usePermissions**(`scopeIds?`: *string*[], `api?`: *boolean*): [IPermission[], (`scope`: PermissionScope) => *boolean*]

Permissions hook that returns atuple of the available
permissions and a function to check if the current user
has the specified permission

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`scopeIds?` | *string*[] | - | Limit the returns permissions to the specified ids   |
`api` | *boolean* | false | Only return permissions available to be called externally    |

**Returns:** [IPermission[], (`scope`: PermissionScope) => *boolean*]

Permissions available based on specified permissionIds
and a function hasPermission that checks if the currently logged
on user has the specified permission.

Defined in: [hooks/user/usePermissions.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/usePermissions.ts#L23)

___

### useToggle

▸ **useToggle**(`initialValue?`: *boolean*): [*boolean*, DispatchWithoutAction]

Returns the tuple [state, dispatch]
Normally with useReducer you pass a value to dispatch to indicate what action to
take on the state, but in this case there's only one action.

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`initialValue` | *boolean* | false |

**Returns:** [*boolean*, DispatchWithoutAction]

Defined in: [hooks/common/useToggle.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useToggle.ts#L11)

___

### useUpdateUserConfiguration

▸ **useUpdateUserConfiguration**<T\>(`config`: T, `update?`: *boolean*): *void*

Update user configuration hook

Retrieves config JSON and update (boolean) and uses useMutation.
It will only execute the mutation if update is equal to true, and
the value has changed.

**`remarks`** For now this is how we update user configuration,
but it might be better ways. For now this should do.

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`config` | T | - | Configuration   |
`update` | *boolean* | true | Update    |

**Returns:** *void*

Defined in: [hooks/user/useUpdateUserConfiguration.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L22)
