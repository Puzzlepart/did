[did-client - v0.11.2](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### Type aliases

- [UseUpdateUserConfigurationParamType](hooks.md#useupdateuserconfigurationparamtype)
- [UseUpdateUserConfigurationReturnType](hooks.md#useupdateuserconfigurationreturntype)

### Other Functions

- [useTimesheetPeriods](hooks.md#usetimesheetperiods)

### React Hook Functions

- [useArray](hooks.md#usearray)
- [useBrowserStorage](hooks.md#usebrowserstorage)
- [useExcelExport](hooks.md#useexcelexport)
- [useFabricIcons](hooks.md#usefabricicons)
- [useMap](hooks.md#usemap)
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

Defined in: [client/hooks/user/useUpdateUserConfiguration.ts:7](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L7)

___

### UseUpdateUserConfigurationReturnType

Ƭ **UseUpdateUserConfigurationReturnType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`updateConfiguration`? | (`config`: *any*) => *Promise*<void\> |
`updateLastActive`? | () => *Promise*<void\> |
`updatePreferredLanguage`? | (`preferredLanguage`: *string*) => *Promise*<void\> |
`updateStartPage`? | (`startPage`: *string*) => *Promise*<void\> |

Defined in: [client/hooks/user/useUpdateUserConfiguration.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L12)

## Other Functions

### useTimesheetPeriods

▸ **useTimesheetPeriods**(`weeksCount?`: *number*, `descending?`: *boolean*): *object*

Get Timesheet periods

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`weeksCount` | *number* | 8 | Number of weeks to retrieve   |
`descending` | *boolean* | false | Return weeks/periods in descending order    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`periods` | IDatePeriod[] |
`queries` | *ConfirmedPeriodsQuery*[] |
`weeks` | [*number*, *number*][] |

Timesheet periods for a number of weeks in the past

Defined in: [client/hooks/common/useTimesheetPeriods.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useTimesheetPeriods.ts#L12)

___

## React Hook Functions

### useArray

▸ **useArray**<T\>(`initialValue?`: T[]): readonly [T[], (`item`: T) => *void*, (`item`: T) => *boolean*]

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

**Returns:** readonly [T[], (`item`: T) => *void*, (`item`: T) => *boolean*]

Defined in: [client/hooks/common/useArray.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useArray.ts#L11)

___

### useBrowserStorage

▸ **useBrowserStorage**<T\>(`__namedParameters`: *Object*): readonly [T, (`value`: *any*) => *void*, () => *void*]

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

**Returns:** readonly [T, (`value`: *any*) => *void*, () => *void*]

Defined in: [client/hooks/browserStorage/useBrowserStorage.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/hooks/browserStorage/useBrowserStorage.ts#L13)

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

Defined in: [client/hooks/excel/useExcelExport.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/hooks/excel/useExcelExport.ts#L19)

___

### useFabricIcons

▸ **useFabricIcons**(): [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)[]

Returns all icons from [@uifabric/icons](https://www.npmjs.com/package/@uifabric/icons)
as an array of `ISuggestionItem`

**Returns:** [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)[]

Defined in: [client/hooks/common/useFabricIcons.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useFabricIcons.ts#L12)

___

### useMap

▸ **useMap**<KeyType, ObjectType, ValueType\>(`map?`: *Map*<any, any\>): *object*

Use a Map as state

#### Type parameters:

Name | Default |
:------ | :------ |
`KeyType` | *string* |
`ObjectType` | *Record*<any, any\> |
`ValueType` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`map` | *Map*<any, any\> | Intitial map    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`$` | ObjectType |
`$set` | *Dispatch*<SetStateAction<Map<KeyType, ValueType\>\>\> |
`reset` | () => *void* |
`set` | (`key`: KeyType, `value`: ValueType) => *void* |
`value` | <T\>(`key`: KeyType, `\_defaultValue`: T) => T |

a `$set` function to set the map, a `set´
function to set a key on the map, a `value`function
to return the value of the specified key, a `$` object
that is a object representation of the map and a `reset`
function for clearing the map.

Defined in: [client/hooks/common/useMap.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L16)

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

Defined in: [client/hooks/notifications/useNotificationsQuery.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/hooks/notifications/useNotificationsQuery.ts#L27)

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

Defined in: [client/hooks/user/usePermissions.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/usePermissions.ts#L22)

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

Defined in: [client/hooks/common/useToggle.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useToggle.ts#L11)

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

Defined in: [client/hooks/user/useUpdateUserConfiguration.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L37)
