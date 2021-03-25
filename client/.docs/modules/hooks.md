[did-client - v0.9.11](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### Type aliases

- [UseUpdateUserConfigurationParamType](hooks.md#useupdateuserconfigurationparamtype)
- [UseUpdateUserConfigurationReturnType](hooks.md#useupdateuserconfigurationreturntype)

### React Hook Functions

- [useArray](hooks.md#usearray)
- [useBrowserStorage](hooks.md#usebrowserstorage)
- [useExcelExport](hooks.md#useexcelexport)
- [useNotificationsQuery](hooks.md#usenotificationsquery)
- [usePermissions](hooks.md#usepermissions)
- [useToggle](hooks.md#usetoggle)
- [useUpdateUserConfiguration](hooks.md#useupdateuserconfiguration)

## Type aliases

### UseUpdateUserConfigurationParamType

Ƭ **UseUpdateUserConfigurationParamType**<T\>: *object*

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Type declaration:

Name | Type |
:------ | :------ |
`autoUpdate`? | *boolean* |
`config`? | T |

Defined in: [hooks/user/useUpdateUserConfiguration.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L8)

___

### UseUpdateUserConfigurationReturnType

Ƭ **UseUpdateUserConfigurationReturnType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`updateConfiguration`? | (`config`: *any*) => *Promise*<void\> |
`updatePreferredLanguage`? | (`preferredLanguage`: *string*) => *Promise*<void\> |
`updateStartPage`? | (`startPage`: *string*) => *Promise*<void\> |

Defined in: [hooks/user/useUpdateUserConfiguration.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L13)

## React Hook Functions

### useArray

▸ **useArray**<T\>(`initialValue?`: T[]): [T[], (`item`: T) => *void*, (`item`: T) => *boolean*]

Returns the current `state` of the array, a function
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

Browser storage hook supporting `arrays`

**`remarks`** Supports `arrays` for now, but can
support `objects`, `strings` etc in the future
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

▸ **useNotificationsQuery**(`__namedParameters`: NotificationsQueryParams): NotificationsQuery

Fetches notifications - returns the data and
a function to refetch the data from the server.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | NotificationsQueryParams |

**Returns:** NotificationsQuery

Defined in: [hooks/notifications/useNotificationsQuery.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/hooks/notifications/useNotificationsQuery.ts#L28)

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

Returns the tuple `[state, dispatch]`

Normally with `useReducer` you pass a value to `dispatch` to indicate what action to
take on the `state`, but in this case there's only one action.

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`initialValue` | *boolean* | false |

**Returns:** [*boolean*, DispatchWithoutAction]

Defined in: [hooks/common/useToggle.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useToggle.ts#L12)

___

### useUpdateUserConfiguration

▸ **useUpdateUserConfiguration**(`params?`: [*UseUpdateUserConfigurationParamType*](hooks.md#useupdateuserconfigurationparamtype)): [*UseUpdateUserConfigurationReturnType*](hooks.md#useupdateuserconfigurationreturntype)

Update user configuration hook

Retrieves config JSON and update (boolean) and uses useMutation.
It will only execute the mutation if update is equal to true, and
the value has changed.

If `autoUpdate` is set to true, the mutation is ran on every
change to the specifie `config` using `useEffect`

**`remarks`** For now this is how we update user configuration,
but it might be better ways. For now this should do.

#### Parameters:

Name | Type |
:------ | :------ |
`params?` | [*UseUpdateUserConfigurationParamType*](hooks.md#useupdateuserconfigurationparamtype) |

**Returns:** [*UseUpdateUserConfigurationReturnType*](hooks.md#useupdateuserconfigurationreturntype)

Defined in: [hooks/user/useUpdateUserConfiguration.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L37)
