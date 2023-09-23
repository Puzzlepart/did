[did-client - v0.13.0](../README.md) / Hooks

# Module: Hooks

Reusable React Hooks

## Table of contents

### Interfaces

- [TypedMap](../interfaces/hooks.typedmap.md)

### Type aliases

- [ComponentLogicHook](hooks.md#componentlogichook)
- [UseUpdateUserConfigurationParamType](hooks.md#useupdateuserconfigurationparamtype)
- [UseUpdateUserConfigurationReturnType](hooks.md#useupdateuserconfigurationreturntype)

### Other Functions

- [useBreadcrumb](hooks.md#usebreadcrumb)
- [useReduxReducer](hooks.md#usereduxreducer)
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

### ComponentLogicHook

Ƭ **ComponentLogicHook**<TProps, TReturnType\>: (`props?`: TProps) => TReturnType

A function that takes in props of type `TProps` and returns a value of type `TReturnType`.
This function is typically used to encapsulate logic for a component to separate it from the
rendering logic.

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`TProps` | {} | The type of the props object passed to the hook.   |
`TReturnType` | *any* | The type of the value returned by the hook.    |

#### Type declaration:

▸ (`props?`: TProps): TReturnType

#### Parameters:

Name | Type |
:------ | :------ |
`props?` | TProps |

**Returns:** TReturnType

Defined in: [client/hooks/types.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/hooks/types.ts#L10)

___

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
`updateLastActive`? | () => *Promise*<void\> |
`updateUserSettings`? | (`user`: [*TypedMap*](../interfaces/hooks.typedmap.md)<any, any, any\>) => *Promise*<boolean\> |

Defined in: [client/hooks/user/useUpdateUserConfiguration.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L12)

## Other Functions

### useBreadcrumb

▸ **useBreadcrumb**(`items`: IBreadcrumbProps[*items*]): *IBreadcrumbProps*

Returns a memoized `IBreadcrumbProps` object with the provided `items` array.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | IBreadcrumbProps[*items*] | An array of `IBreadcrumbItem` objects to display in the breadcrumb.    |

**Returns:** *IBreadcrumbProps*

A memoized `IBreadcrumbProps` object with the provided `items` array.

Defined in: [client/hooks/useBreadcrumb.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/hooks/useBreadcrumb.ts#L11)

___

### useReduxReducer

▸ `Const`**useReduxReducer**<S\>(`initialState`: S, `builderCallback`: *BuilderCallback*<S\>): [S, *Dispatch*<AnyAction\>]

A custom hook that uses React's useReducer hook with `@reduxjs/toolkit`'s createReducer function.

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`S` | *any* | The type of the state object.   |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`initialState` | S | The initial state of the reducer.   |
`builderCallback` | *BuilderCallback*<S\> | A function that takes a reducer and returns a new reducer with additional functionality.    |

**Returns:** [S, *Dispatch*<AnyAction\>]

A tuple containing the current state and a dispatch function to update the state.

Defined in: [client/hooks/useReduxReducer.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/hooks/useReduxReducer.ts#L25)

___

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

▸ **useFabricIcons**(`includeFluentIcons?`: *boolean*): [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)[]

Returns all icons from [@uifabric/icons](https://www.npmjs.com/package/@uifabric/icons)
as an array of `ISuggestionItem`

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`includeFluentIcons` | *boolean* | false | Whether to include Fluent UI 2 icons.    |

**Returns:** [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)[]

Defined in: [client/hooks/common/useFabricIcons.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useFabricIcons.ts#L15)

___

### useMap

▸ **useMap**<KeyType, ObjectType, ValueType\>(`initialMap?`: *Map*<any, any\>): [*TypedMap*](../interfaces/hooks.typedmap.md)<KeyType, ObjectType, ValueType\>

Hook for using a `Map` as a state object. A set of
functions are returned for setting the map, setting
a key on the map, getting the value of a key, getting
an object representation of the map and clearing the
map.

#### Type parameters:

Name | Default |
:------ | :------ |
`KeyType` | *string* |
`ObjectType` | *Record*<any, any\> |
`ValueType` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`initialMap` | *Map*<any, any\> | Intitial map    |

**Returns:** [*TypedMap*](../interfaces/hooks.typedmap.md)<KeyType, ObjectType, ValueType\>

A `TypedMap` with a `$set` function to set the map, a `set´
function to set a key on the map, a `value`function
to return the value of the specified key, a `$` object
that is a object representation of the map and a `reset`
function for clearing the map. Also a `isSet` function
to check if all the specified keys have a non-blank value.

Defined in: [client/hooks/common/useMap.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/hooks/common/useMap.ts#L23)

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

▸ **usePermissions**(`scopeIds?`: *string*[], `api?`: *boolean*): UsePermissionsReturnType

Permissions hook that returns  tuple of the available
permissions and a function to check if the current user
has the specified permission.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`scopeIds?` | *string*[] | - | Limit the returns permissions to the specified Ids   |
`api` | *boolean* | false | Only return permissions available to be called externally    |

**Returns:** UsePermissionsReturnType

Permissions available based on specified `permissionIds`
and a function `hasPermission` that checks if the currently logged
on user has the specified permission.

Defined in: [client/hooks/user/usePermissions.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/usePermissions.ts#L26)

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

Name | Type | Description |
:------ | :------ | :------ |
`params?` | [*UseUpdateUserConfigurationParamType*](hooks.md#useupdateuserconfigurationparamtype) | Parameters    |

**Returns:** [*UseUpdateUserConfigurationReturnType*](hooks.md#useupdateuserconfigurationreturntype)

Defined in: [client/hooks/user/useUpdateUserConfiguration.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/hooks/user/useUpdateUserConfiguration.ts#L34)
