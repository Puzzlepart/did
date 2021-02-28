[did-client - v0.10.0](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### Timesheet Classes

- [TimesheetPeriod](../classes/pages.timesheetperiod.md)
- [TimesheetScope](../classes/pages.timesheetscope.md)

### Other Interfaces

- [ITimesheetParameters](../interfaces/pages.itimesheetparameters.md)
- [ITimesheetState](../interfaces/pages.itimesheetstate.md)

### Projects Interfaces

- [IProjectListProps](../interfaces/pages.iprojectlistprops.md)
- [IProjectsContext](../interfaces/pages.iprojectscontext.md)
- [IProjectsParameters](../interfaces/pages.iprojectsparameters.md)
- [IProjectsState](../interfaces/pages.iprojectsstate.md)

### Reports Interfaces

- [IReportsContext](../interfaces/pages.ireportscontext.md)
- [IReportsParameters](../interfaces/pages.ireportsparameters.md)
- [IReportsQuery](../interfaces/pages.ireportsquery.md)
- [IReportsSavedFilter](../interfaces/pages.ireportssavedfilter.md)
- [IReportsState](../interfaces/pages.ireportsstate.md)

### Timesheet Interfaces

- [ITimesheetContext](../interfaces/pages.itimesheetcontext.md)

### Type aliases

- [TimesheetView](pages.md#timesheetview)

### Function Component Variables

- [ApiTokens](pages.md#apitokens)
- [Customers](pages.md#customers)
- [Home](pages.md#home)
- [Projects](pages.md#projects)
- [Timesheet](pages.md#timesheet)

### Projects Variables

- [Header](pages.md#header)
- [Information](pages.md#information)
- [ProjectDetails](pages.md#projectdetails)
- [ProjectForm](pages.md#projectform)
- [ProjectList](pages.md#projectlist)
- [ProjectsContext](pages.md#projectscontext)
- [TimeEntries](pages.md#timeentries)

### Reports Variables

- [ReportsContext](pages.md#reportscontext)

### Timesheet Variables

- [TimesheetContext](pages.md#timesheetcontext)

### Function Component Functions

- [Admin](pages.md#admin)
- [Labels](pages.md#labels)
- [Roles](pages.md#roles)
- [SummaryView](pages.md#summaryview)
- [Users](pages.md#users)

### Other Functions

- [useHotkeys](pages.md#usehotkeys)
- [useSubmitActions](pages.md#usesubmitactions)
- [useTimesheet](pages.md#usetimesheet)
- [useTimesheetQuery](pages.md#usetimesheetquery)

### Reports Functions

- [SaveFilterForm](pages.md#savefilterform)
- [getQueryPresets](pages.md#getquerypresets)

### Reports Hooks Functions

- [useReports](pages.md#usereports)
- [useReportsReducer](pages.md#usereportsreducer)
- [useUpdateUserConfiguration](pages.md#useupdateuserconfiguration)

## Type aliases

### TimesheetView

Ƭ **TimesheetView**: *overview* \| *summary* \| *allocation*

Defined in: [client/pages/Timesheet/types.ts:5](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L5)

## Function Component Variables

### ApiTokens

• `Const` **ApiTokens**: FunctionComponent

Component for handling API tokens.

* See created API tokens
* Create new API tokens
* Delete existing API tokens

Defined in: [client/pages/Admin/ApiTokens/index.tsx:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/ApiTokens/index.tsx#L27)

___

### Customers

• `Const` **Customers**: FunctionComponent

Defined in: [client/pages/Customers/Customers.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L23)

___

### Home

• `Const` **Home**: FunctionComponent

Defined in: [client/pages/Home/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Home/index.tsx#L12)

___

### Projects

• `Const` **Projects**: FunctionComponent

Defined in: [client/pages/Projects/Projects.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L18)

___

### Timesheet

• `Const` **Timesheet**: FunctionComponent

Defined in: [client/pages/Timesheet/Timesheet.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L20)

___

## Projects Variables

### Header

• `Const` **Header**: FunctionComponent

Defined in: [client/pages/Projects/ProjectDetails/Header/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Header/index.tsx#L11)

___

### Information

• `Const` **Information**: FunctionComponent

Defined in: [client/pages/Projects/ProjectDetails/Information/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Information/index.tsx#L16)

___

### ProjectDetails

• `Const` **ProjectDetails**: FunctionComponent

Defined in: [client/pages/Projects/ProjectDetails/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/index.tsx#L15)

___

### ProjectForm

• `Const` **ProjectForm**: *FunctionComponent*<IProjectFormProps\>

Defined in: [client/pages/Projects/ProjectForm/index.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/index.tsx#L33)

___

### ProjectList

• `Const` **ProjectList**: *FunctionComponent*<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Defined in: [client/pages/Projects/ProjectList/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/index.tsx#L13)

___

### ProjectsContext

• `Const` **ProjectsContext**: *Context*<[*IProjectsContext*](../interfaces/pages.iprojectscontext.md)\>

Defined in: [client/pages/Projects/context.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L19)

___

### TimeEntries

• `Const` **TimeEntries**: FunctionComponent

Defined in: [client/pages/Projects/ProjectDetails/TimeEntries/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/TimeEntries/index.tsx#L18)

___

## Reports Variables

### ReportsContext

• `Const` **ReportsContext**: *Context*<[*IReportsContext*](../interfaces/pages.ireportscontext.md)\>

Defined in: [client/pages/Reports/context.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L30)

___

## Timesheet Variables

### TimesheetContext

• `Const` **TimesheetContext**: *Context*<[*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)\>

Defined in: [client/pages/Timesheet/context.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L34)

## Function Component Functions

### Admin

▸ `Const`**Admin**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Admin.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L18)

___

### Labels

▸ `Const`**Labels**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Labels/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Labels/index.tsx#L15)

___

### Roles

▸ `Const`**Roles**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Roles/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Roles/index.tsx#L15)

___

### SummaryView

▸ `Const`**SummaryView**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/SummaryView/index.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/SummaryView/index.tsx#L20)

___

### Users

▸ `Const`**Users**(): *Element*

Manage users

* See active users
* Add new users
* Edit users

**Returns:** *Element*

Defined in: [client/pages/Admin/Users/index.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Users/index.tsx#L25)

___

## Other Functions

### useHotkeys

▸ **useHotkeys**(`context`: [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)): *object*

Hook for hotkeys

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md) | Context    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`hotkeysProps` | *GlobalHotKeysProps* |

Defined in: [client/pages/Timesheet/hooks/useHotkeys.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useHotkeys.tsx#L10)

___

### useSubmitActions

▸ **useSubmitActions**(`__namedParameters`: *Object*): *object*

Hook for Timesheet submit actions

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L11)

___

### useTimesheet

▸ **useTimesheet**(): *object*

Hook for Timesheet

* Get history using useHistory
* Get URL params using useParams
* Using reducer from /reducer
* Using useTimesheetQuery with timesheet.gql
* Layout effects for initialiing state and updating state
  when the query is reloaded
* Returns TimesheetContextProvider with Timesheet context

**Returns:** *object*

Name | Type |
:------ | :------ |
`context` | [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md) |
`dispatch` | *Dispatch*<AnyAction\> |
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) |
`t` | TFunction |

Defined in: [client/pages/Timesheet/hooks/useTimesheet.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheet.tsx#L24)

___

### useTimesheetQuery

▸ **useTimesheetQuery**(`state`: [*ITimesheetState*](../interfaces/pages.itimesheetstate.md), `dispatch`: *Dispatch*<AnyAction\>): *object*

Use Timesheet query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) | State   |
`dispatch` | *Dispatch*<AnyAction\> | Dispatch    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`refetch` | (`variables?`: *Partial*<{ `options`: { `dateFormat`: *string* = 'dddd DD'; `locale`: *string* ; `tzOffset`: *number*  } ; `query`: *TimesheetQuery*  }\>) => *Promise*<ApolloQueryResult<any\>\> |

Defined in: [client/pages/Timesheet/hooks/useTimesheetQuery.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheetQuery.tsx#L15)

___

## Reports Functions

### SaveFilterForm

▸ `Const`**SaveFilterForm**(`props`: *ISaveFilterFormProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *ISaveFilterFormProps* |

**Returns:** *Element*

Defined in: [client/pages/Reports/SaveFilterForm/index.tsx:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/SaveFilterForm/index.tsx#L27)

___

### getQueryPresets

▸ **getQueryPresets**<T\>(`t`: TFunction): T[]

Get query presets

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md) |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function    |

**Returns:** T[]

Defined in: [client/pages/Reports/queries.tsx:117](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/queries.tsx#L117)

___

## Reports Hooks Functions

### useReports

▸ **useReports**(): *object*

Hook for Reports

* Get history using useHistory
* Get URL params using useParams
* Get queries using getQueries
* Using reducer from /reducer
* Using query with timeentries.gql
* Layout effect for updating URL when changing query
* Layout effects for initialiing state and updating state
  when the query is reloaded

**Returns:** *object*

Name | Type |
:------ | :------ |
`dispatch` | *Dispatch*<AnyAction\> |
`filters` | [*BaseFilter*](../classes/components.basefilter.md)<any\>[] |
`history` | *History*<unknown\> |
`params` | [*IReportsParameters*](../interfaces/pages.ireportsparameters.md) |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |
`t` | TFunction |

Defined in: [client/pages/Reports/hooks/useReports.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReports.ts#L27)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): *object*

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`dispatch` | *Dispatch*<AnyAction\> |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |

Defined in: [client/pages/Reports/hooks/useReportsReducer.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsReducer.ts#L16)

___

### useUpdateUserConfiguration

▸ **useUpdateUserConfiguration**<T\>(`config`: T): *void*

Use update user configuration

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`config` | T | Configuration    |

**Returns:** *void*

Defined in: [client/pages/Reports/hooks/useUpdateUserConfiguration.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useUpdateUserConfiguration.ts#L14)
