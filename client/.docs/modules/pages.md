[did-client - v0.9.8](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### References

- [query\_preset\_current\_year](pages.md#query_preset_current_year)
- [query\_preset\_forecast](pages.md#query_preset_forecast)
- [query\_preset\_last\_month](pages.md#query_preset_last_month)
- [query\_preset\_last\_year](pages.md#query_preset_last_year)

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
- [IReportsQueryPresetItem](../interfaces/pages.ireportsquerypresetitem.md)
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

### Other Variables

- [query\_preset\_current\_month](pages.md#query_preset_current_month)

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

- [currentMonthQueryPreset](pages.md#currentmonthquerypreset)
- [currentYearQueryPreset](pages.md#currentyearquerypreset)
- [forecastQueryPreset](pages.md#forecastquerypreset)
- [lastMonthQueryPreset](pages.md#lastmonthquerypreset)
- [lastYearQueryPreset](pages.md#lastyearquerypreset)

### Reports Functions

- [SaveFilterForm](pages.md#savefilterform)
- [useQueryPresets](pages.md#usequerypresets)

### Reports Hooks Functions

- [useColumns](pages.md#usecolumns)
- [useReports](pages.md#usereports)
- [useReportsQuery](pages.md#usereportsquery)
- [useReportsReducer](pages.md#usereportsreducer)

### Timesheet Hooks Functions

- [useSubmitActions](pages.md#usesubmitactions)
- [useTimesheet](pages.md#usetimesheet)
- [useTimesheetQuery](pages.md#usetimesheetquery)

## References

### query\_preset\_current\_year

Renames and exports: [query\_preset\_current\_month](pages.md#query_preset_current_month)

___

### query\_preset\_forecast

Renames and exports: [query\_preset\_current\_month](pages.md#query_preset_current_month)

___

### query\_preset\_last\_month

Renames and exports: [query\_preset\_current\_month](pages.md#query_preset_current_month)

___

### query\_preset\_last\_year

Renames and exports: [query\_preset\_current\_month](pages.md#query_preset_current_month)

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

Defined in: [client/pages/Timesheet/Timesheet.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L21)

___

## Other Variables

### query\_preset\_current\_month

• `Const` **query\_preset\_current\_month**: DocumentNode

This is a GraphQL query imported from a .gql or .graphql file.

The Apollo extension for VS Code is recommended when working with
.gql files.

The extension enables you to:

* Add syntax highlighting for GraphQL files and gql templates inside JavaScript files
* Get instant feedback and intelligent autocomplete for fields, arguments, types, and variables as you write queries
* Manage client side schema alongside remote schema
* See performance information inline with your query definitions
* Validate field and argument usage in operations
* Navigate projects more easily with jump-to and peek-at definitions
* Manage client-only schemas
* Switch graph variants to work with schemas running on different environments

**`see`** https://www.apollographql.com/docs/devtools/editor-plugins/

Defined in: [client/global.d.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/global.d.ts#L24)

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

Defined in: [client/pages/Reports/context.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L36)

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

### currentMonthQueryPreset

▸ `Const`**currentMonthQueryPreset**(`t`: TFunction, `query?`: *any*): *object*

Current month query preset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | Query    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`exportFileName` | *string* |
`iconName` | *string* |
`key` | *string* |
`query` | *any* |
`text` | *string* |

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:41](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L41)

___

### currentYearQueryPreset

▸ `Const`**currentYearQueryPreset**(`t`: TFunction, `query?`: *any*): *object*

Current year query preset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | Query    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`exportFileName` | *string* |
`iconName` | *string* |
`key` | *string* |
`query` | *any* |
`text` | *string* |

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:82](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L82)

___

### forecastQueryPreset

▸ `Const`**forecastQueryPreset**(`t`: TFunction, `query?`: *any*): *object*

Forecast query preset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | Query    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`exportFileName` | *string* |
`iconName` | *string* |
`key` | *string* |
`query` | *any* |
`text` | *string* |

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:102](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L102)

___

### lastMonthQueryPreset

▸ `Const`**lastMonthQueryPreset**(`t`: TFunction, `query?`: *any*): *object*

Last month query preset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | Query    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`exportFileName` | *string* |
`iconName` | *string* |
`key` | *string* |
`query` | *any* |
`text` | *string* |

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L21)

___

### lastYearQueryPreset

▸ `Const`**lastYearQueryPreset**(`t`: TFunction, `query?`: *any*): *object*

Last year query preset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | Query    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`exportFileName` | *string* |
`iconName` | *string* |
`key` | *string* |
`query` | *any* |
`text` | *string* |

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:61](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L61)

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

### useQueryPresets

▸ **useQueryPresets**(): [*IReportsQueryPresetItem*](../interfaces/pages.ireportsquerypresetitem.md)[]

Use query presets

**Returns:** [*IReportsQueryPresetItem*](../interfaces/pages.ireportsquerypresetitem.md)[]

Defined in: [client/pages/Reports/hooks/query-presets/index.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/query-presets/index.tsx#L120)

___

## Reports Hooks Functions

### useColumns

▸ **useColumns**(`__namedParameters`: *Object*): *any*[]

Columns hook

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *any*[]

Defined in: [client/pages/Reports/hooks/useColumns.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useColumns.tsx#L16)

___

### useReports

▸ **useReports**(): *object*

Hook for Reports

* Get history using `useHistory`
* Get URL params using `useParams`
* Get queries using `useQueryPresets`
* Using reducer `useReportsReducer`
* Using `useReportQuery`
* Layout effect (`useLayoutEffect`) for updating URL when changing query
  when the query is reloaded

**Returns:** *object*

Name | Type |
:------ | :------ |
`columns` | *any*[] |
`dispatch` | *Dispatch*<AnyAction\> |
`filters` | [*BaseFilter*](../classes/components.basefilter.md)<any\>[] |
`history` | *History*<unknown\> |
`params` | [*IReportsParameters*](../interfaces/pages.ireportsparameters.md) |
`queries` | [*IReportsQueryPresetItem*](../interfaces/pages.ireportsquerypresetitem.md)[] |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |
`t` | TFunction |

Defined in: [client/pages/Reports/hooks/useReports.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReports.ts#L26)

___

### useReportsQuery

▸ **useReportsQuery**(`__namedParameters`: *Object*): *void*

Hook for Reports Query.

Using `useQuery` with and dispatches
`DATA_UPDATED` action on query changes.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *void*

Defined in: [client/pages/Reports/hooks/useReportsQuery.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQuery.ts#L15)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQueryPresetItem*](../interfaces/pages.ireportsquerypresetitem.md)[]): *object*

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQueryPresetItem*](../interfaces/pages.ireportsquerypresetitem.md)[] | Queries    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`dispatch` | *Dispatch*<AnyAction\> |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |

Defined in: [client/pages/Reports/reducer/useReportsReducer.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/reducer/useReportsReducer.ts#L16)

___

## Timesheet Hooks Functions

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

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L14)

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

Defined in: [client/pages/Timesheet/hooks/useTimesheetQuery.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheetQuery.tsx#L18)
