[did-client - v0.9.11](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### References

- [report\_current\_year](pages.md#report_current_year)
- [report\_forecast](pages.md#report_forecast)
- [report\_last\_month](pages.md#report_last_month)
- [report\_last\_year](pages.md#report_last_year)

### Timesheet Classes

- [TimesheetPeriod](../classes/pages.timesheetperiod.md)
- [TimesheetScope](../classes/pages.timesheetscope.md)

### Projects Interfaces

- [IProjectListProps](../interfaces/pages.iprojectlistprops.md)
- [IProjectsContext](../interfaces/pages.iprojectscontext.md)
- [IProjectsParameters](../interfaces/pages.iprojectsparameters.md)
- [IProjectsState](../interfaces/pages.iprojectsstate.md)

### Reports Interfaces

- [IReportsContext](../interfaces/pages.ireportscontext.md)
- [IReportsData](../interfaces/pages.ireportsdata.md)
- [IReportsParameters](../interfaces/pages.ireportsparameters.md)
- [IReportsQuery](../interfaces/pages.ireportsquery.md)
- [IReportsSavedFilter](../interfaces/pages.ireportssavedfilter.md)
- [IReportsState](../interfaces/pages.ireportsstate.md)

### Timesheet Interfaces

- [ITimesheetContext](../interfaces/pages.itimesheetcontext.md)
- [ITimesheetParameters](../interfaces/pages.itimesheetparameters.md)
- [ITimesheetState](../interfaces/pages.itimesheetstate.md)

### Timesheet Type aliases

- [TimesheetView](pages.md#timesheetview)

### Function Component Variables

- [ApiTokens](pages.md#apitokens)
- [Customers](pages.md#customers)
- [Home](pages.md#home)
- [Projects](pages.md#projects)
- [Timesheet](pages.md#timesheet)

### Other Variables

- [report\_current\_month](pages.md#report_current_month)

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
- [Users](pages.md#users)

### Reports Functions

- [SaveFilterForm](pages.md#savefilterform)
- [currentMonthQuery](pages.md#currentmonthquery)
- [currentYearQuery](pages.md#currentyearquery)
- [forecastQuery](pages.md#forecastquery)
- [lastMonthQuery](pages.md#lastmonthquery)
- [lastYearQuery](pages.md#lastyearquery)
- [summaryQuery](pages.md#summaryquery)
- [useQueries](pages.md#usequeries)

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

### report\_current\_year

Renames and exports: [report\_current\_month](pages.md#report_current_month)

___

### report\_forecast

Renames and exports: [report\_current\_month](pages.md#report_current_month)

___

### report\_last\_month

Renames and exports: [report\_current\_month](pages.md#report_current_month)

___

### report\_last\_year

Renames and exports: [report\_current\_month](pages.md#report_current_month)

## Timesheet Type aliases

### TimesheetView

Ƭ **TimesheetView**: *overview* \| *summary* \| *allocation*

Defined in: [client/pages/Timesheet/types.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L9)

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

Defined in: [client/pages/Customers/Customers.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L24)

___

### Home

• `Const` **Home**: FunctionComponent

Defined in: [client/pages/Home/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Home/index.tsx#L14)

___

### Projects

• `Const` **Projects**: FunctionComponent

Defined in: [client/pages/Projects/Projects.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L19)

___

### Timesheet

• `Const` **Timesheet**: FunctionComponent

Defined in: [client/pages/Timesheet/Timesheet.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L21)

___

## Other Variables

### report\_current\_month

• `Const` **report\_current\_month**: DocumentNode

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

Defined in: [client/pages/Projects/ProjectForm/index.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/index.tsx#L22)

___

### ProjectList

• `Const` **ProjectList**: *FunctionComponent*<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Project list component used by `<Projects />`. Renders
projects in a list using our `<List />` component.

Defined in: [client/pages/Projects/ProjectList/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/index.tsx#L17)

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

Defined in: [client/pages/Admin/Admin.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L12)

___

### Labels

▸ `Const`**Labels**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Labels/index.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Labels/index.tsx#L10)

___

### Roles

▸ `Const`**Roles**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Roles/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Roles/index.tsx#L14)

___

### Users

▸ `Const`**Users**(): *Element*

Manage users

* See active users
* Add new users
* Edit users

**Returns:** *Element*

Defined in: [client/pages/Admin/Users/index.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Users/index.tsx#L20)

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

### currentMonthQuery

▸ **currentMonthQuery**(`t`: TFunction, `query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_MONTH**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:57](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L57)

___

### currentYearQuery

▸ **currentYearQuery**(`t`: TFunction, `query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_YEAR**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:114](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L114)

___

### forecastQuery

▸ **forecastQuery**(`t`: TFunction, `query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**FORECAST**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:142](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L142)

___

### lastMonthQuery

▸ **lastMonthQuery**(`t`: TFunction, `query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**LAST_MONTH**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:29](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L29)

___

### lastYearQuery

▸ **lastYearQuery**(`t`: TFunction, `query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**LAST_YEAR**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate   |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L85)

___

### summaryQuery

▸ **summaryQuery**(`t`: TFunction): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for
Summary view

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useQueries.tsx:163](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L163)

___

### useQueries

▸ **useQueries**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Use queries

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Defined in: [client/pages/Reports/hooks/useQueries.tsx:188](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useQueries.tsx#L188)

___

## Reports Hooks Functions

### useColumns

▸ **useColumns**(`__namedParameters`: *Object*): *IListColumn*<IListColumnData\>[]

Columns hook

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *IListColumn*<IListColumnData\>[]

Defined in: [client/pages/Reports/hooks/useColumns.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useColumns.tsx#L16)

___

### useReports

▸ **useReports**(): *object*

Hook for Reports

* Get history using `useHistory`
* Get URL params using `useParams`
* Get queries using `useQueries`
* Using reducer `useReportsReducer`
* Using `useReportQuery`
* Layout effect (`useLayoutEffect`) for updating URL when changing query
  when the query is reloaded

**Returns:** *object*

Name | Type |
:------ | :------ |
`columns` | *IListColumn*<IListColumnData\>[] |
`dispatch` | *Dispatch*<AnyAction\> |
`filters` | [*BaseFilter*](../classes/components.basefilter.md)[] |
`history` | *History*<unknown\> |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |
`t` | TFunction |

Defined in: [client/pages/Reports/hooks/useReports.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReports.ts#L25)

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

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

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
