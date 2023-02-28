[did-client - v0.11.5](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### Namespaces

- [Home](pages.home.md)
- [Timesheet](pages.timesheet.md)

### Other Enumerations

- [GetEventsOption](../enums/pages.geteventsoption.md)

### Timesheet Enumerations

- [TimesheetView](../enums/pages.timesheetview.md)

### Timesheet Classes

- [TimesheetDateRange](../classes/pages.timesheetdaterange.md)
- [TimesheetPeriod](../classes/pages.timesheetperiod.md)

### Projects Interfaces

- [IProjectListProps](../interfaces/pages.iprojectlistprops.md)
- [IProjectsContext](../interfaces/pages.iprojectscontext.md)
- [IProjectsState](../interfaces/pages.iprojectsstate.md)
- [IProjectsUrlParameters](../interfaces/pages.iprojectsurlparameters.md)

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

### Other Type aliases

- [UseReportsQueryOptions](pages.md#usereportsqueryoptions)

### Timesheet Hooks Type aliases

- [UseSubmitActionsParams](pages.md#usesubmitactionsparams)

### Function Component Variables

- [Customers](pages.md#customers)
- [Projects](pages.md#projects)
- [Timesheet](pages.md#timesheet)

### Other Variables

- [default\_query](pages.md#default_query)

### Page Component Variables

- [AdminPage](pages.md#adminpage)
- [CustomersPage](pages.md#customerspage)
- [Home](pages.md#home)
- [ProjectsPage](pages.md#projectspage)
- [ReportsPage](pages.md#reportspage)
- [TimesheetPage](pages.md#timesheetpage)

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
- [SaveFilterForm](pages.md#savefilterform)

### Timesheet Variables

- [TimesheetContext](pages.md#timesheetcontext)

### Function Component Functions

- [Admin](pages.md#admin)

### Other Functions

- [useCommands](pages.md#usecommands)

### Reports Functions

- [useCurrentMonthQuery](pages.md#usecurrentmonthquery)
- [useCurrentYearQuery](pages.md#usecurrentyearquery)
- [useForecastQuery](pages.md#useforecastquery)
- [useLastMonthQuery](pages.md#uselastmonthquery)
- [useLastYearQuery](pages.md#uselastyearquery)
- [useReportsQueries](pages.md#usereportsqueries)
- [useReportsQueryOptions](pages.md#usereportsqueryoptions)
- [useSummaryQuery](pages.md#usesummaryquery)

### Reports Hooks Functions

- [useReportsQuery](pages.md#usereportsquery)
- [useReportsReducer](pages.md#usereportsreducer)

### Timesheet Functions

- [useTimesheetContext](pages.md#usetimesheetcontext)

### Timesheet Hooks Functions

- [useSubmitActions](pages.md#usesubmitactions)
- [useTimesheet](pages.md#usetimesheet)
- [useTimesheetQuery](pages.md#usetimesheetquery)

## Other Type aliases

### UseReportsQueryOptions

Ƭ **UseReportsQueryOptions**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`dispatch` | *React.Dispatch*<AnyAction\> |
`queries` | *ReturnType*<*typeof* [*useReportsQueries*](pages.md#usereportsqueries)\> |
`state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |

Defined in: [pages/Reports/hooks/useReportsQueryOptions.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueryOptions.ts#L12)

___

## Timesheet Hooks Type aliases

### UseSubmitActionsParams

Ƭ **UseSubmitActionsParams**: *object*

Parameters type for `useSubmitActions`

#### Type declaration:

Name | Type |
:------ | :------ |
`dispatch` | *Dispatch*<AnyAction\> |
`refetch` | () => *Promise*<ApolloQueryResult<any\>\> |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) |

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L17)

## Function Component Variables

### Customers

• `Const` **Customers**: [*TabComponent*](components.md#tabcomponent)<ICustomerFormProps\>

Defined in: [pages/Customers/Customers.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L17)

___

### Projects

• `Const` **Projects**: FC

Defined in: [pages/Projects/Projects.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L16)

___

### Timesheet

• `Const` **Timesheet**: FC

Defined in: [pages/Timesheet/Timesheet.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L20)

___

## Other Variables

### default\_query

• `Const` **default\_query**: DocumentNode

This is a GraphQL query imported from a .gql or .graphql file.

**`see`** https://www.apollographql.com/docs/devtools/editor-plugins/

Defined in: [global.d.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/global.d.ts#L11)

___

## Page Component Variables

### AdminPage

• `Const` **AdminPage**: PageComponent

Admin page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Admin/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/index.tsx#L17)

___

### CustomersPage

• `Const` **CustomersPage**: PageComponent

Customers page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Customers/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/index.tsx#L16)

___

### Home

• `Const` **Home**: PageComponent

Home page

Defined in: [pages/Home/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Home/index.tsx#L18)

___

### ProjectsPage

• `Const` **ProjectsPage**: PageComponent

Projects page

Using `Switch`, `Route` and `useRouteMatch` from
[react-router-dom](https://www.npmjs.com/package/react-router-dom)
to support navigating between
sub components

Defined in: [pages/Projects/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/index.tsx#L17)

___

### ReportsPage

• `Const` **ReportsPage**: PageComponent

Reports page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Reports/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/index.tsx#L15)

___

### TimesheetPage

• `Const` **TimesheetPage**: PageComponent

Timesheet page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Timesheet/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/index.tsx#L16)

___

## Projects Variables

### Header

• `Const` **Header**: FC

Defined in: [pages/Projects/ProjectDetails/Header/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Header/index.tsx#L13)

___

### Information

• `Const` **Information**: FC

Defined in: [pages/Projects/ProjectDetails/Information/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Information/index.tsx#L14)

___

### ProjectDetails

• `Const` **ProjectDetails**: FC

Defined in: [pages/Projects/ProjectDetails/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/index.tsx#L13)

___

### ProjectForm

• `Const` **ProjectForm**: [*TabComponent*](components.md#tabcomponent)<IProjectFormProps\>

Defined in: [pages/Projects/ProjectForm/index.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/index.tsx#L25)

___

### ProjectList

• `Const` **ProjectList**: [*TabComponent*](components.md#tabcomponent)<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Project list component used by `<Projects />`. Renders
projects in a list using our `<List />` component.

Defined in: [pages/Projects/ProjectList/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/index.tsx#L16)

___

### ProjectsContext

• `Const` **ProjectsContext**: *Context*<[*IProjectsContext*](../interfaces/pages.iprojectscontext.md)\>

Defined in: [pages/Projects/context.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L19)

___

### TimeEntries

• `Const` **TimeEntries**: FC

Defined in: [pages/Projects/ProjectDetails/TimeEntries/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/TimeEntries/index.tsx#L14)

___

## Reports Variables

### ReportsContext

• `Const` **ReportsContext**: *Context*<[*IReportsContext*](../interfaces/pages.ireportscontext.md)\>

Defined in: [pages/Reports/context.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L35)

___

### SaveFilterForm

• `Const` **SaveFilterForm**: *FC*<ISaveFilterFormProps\>

Defined in: [pages/Reports/SaveFilterForm/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/SaveFilterForm/index.tsx#L13)

___

## Timesheet Variables

### TimesheetContext

• `Const` **TimesheetContext**: *Context*<[*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)\>

Defined in: [pages/Timesheet/context.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L30)

## Function Component Functions

### Admin

▸ `Const`**Admin**(): *Element*

**Returns:** *Element*

Defined in: [pages/Admin/Admin.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L19)

___

## Other Functions

### useCommands

▸ **useCommands**(): ICommandBarProps

**Returns:** ICommandBarProps

Defined in: [pages/Reports/ReportsList/useCommands.tsx:71](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/ReportsList/useCommands.tsx#L71)

___

## Reports Functions

### useCurrentMonthQuery

▸ **useCurrentMonthQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_MONTH**. Report link ref (`reportLinkRef`)
is added to find potential report links for
this query..

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L61)

___

### useCurrentYearQuery

▸ **useCurrentYearQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_YEAR**. Report link ref (`reportLinkRef`)
is added to find potential report links for
this query..

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:125](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L125)

___

### useForecastQuery

▸ **useForecastQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**FORECAST**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:156](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L156)

___

### useLastMonthQuery

▸ **useLastMonthQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**LAST_MONTH**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L28)

___

### useLastYearQuery

▸ **useLastYearQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**LAST_YEAR**. Report link ref (`reportLinkRef`)
is added to find potential report links for
this query.

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L96)

___

### useReportsQueries

▸ **useReportsQueries**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Use Reports Queries. Returns all queries
used in reports. Each query is generated
by a separate hook.

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Defined in: [pages/Reports/hooks/useReportsQueries.ts:199](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L199)

___

### useReportsQueryOptions

▸ **useReportsQueryOptions**(`__namedParameters`: [*UseReportsQueryOptions*](pages.md#usereportsqueryoptions)): IChoiceGroupOption[]

Returns queries from `useReportsQueries` as choice group options
to be used in `<ChoiceGroup />` component. Also appends promoted
report links (`promoted` property is `true`). Promoted report links
are added to the end of the list.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*UseReportsQueryOptions*](pages.md#usereportsqueryoptions) |

**Returns:** IChoiceGroupOption[]

Defined in: [pages/Reports/hooks/useReportsQueryOptions.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueryOptions.ts#L26)

___

### useSummaryQuery

▸ **useSummaryQuery**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for Summary view.

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [pages/Reports/hooks/useReportsQueries.ts:175](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L175)

___

## Reports Hooks Functions

### useReportsQuery

▸ **useReportsQuery**(`__namedParameters`: useReportsQuery): *function*

Hook for Reports Query.

Using `useLazyQuery` and `useLayoutEffect` and dispatches
`DATA_UPDATED` action on query changes. Also fetches report links
using `useQuery`.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | useReportsQuery |

**Returns:** (`options?`: *QueryLazyOptions*<any\>) => *void*

`query` from `useLazyQuery`. A callback function that
executes the query. It takes an optional `QueryLazyOptions` object
as an argument.

Defined in: [pages/Reports/hooks/useReportsQuery.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQuery.ts#L37)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Defined in: [pages/Reports/reducer/useReportsReducer.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/reducer/useReportsReducer.ts#L18)

___

## Timesheet Functions

### useTimesheetContext

▸ `Const`**useTimesheetContext**(): [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

Returns the current context value for Timesheet using
`useContext` from `react`

**Returns:** [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

`TimesheetContext`

Defined in: [pages/Timesheet/context.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L40)

___

## Timesheet Hooks Functions

### useSubmitActions

▸ **useSubmitActions**(`__namedParameters`: [*UseSubmitActionsParams*](pages.md#usesubmitactionsparams)): *object*

Timesheet submit action callbacks using `React.useCallback`

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*UseSubmitActionsParams*](pages.md#usesubmitactionsparams) |

**Returns:** *object*

Name | Type |
:------ | :------ |
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L28)

___

### useTimesheet

▸ **useTimesheet**(): *object*

Hook for Timesheet

* Reacts to state changes and updates history
using `useTimesheetHistory`
* Using `useTimesheetReducer` to handle state
and dispatching actions
* Using `useTimesheetQuery` with timesheet.gql

**Returns:** *object*

Name | Type |
:------ | :------ |
`context` | [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md) |
`dispatch` | *Dispatch*<AnyAction\> |
`headerButtonProps` | *object* |
`headerButtonProps.disabled` | *boolean* |
`headerButtonProps.style` | { `opacity`: *number* = 0.4 } \| { `opacity`: *undefined* = 0.4 } |
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) |

Timesheet context

Defined in: [pages/Timesheet/hooks/useTimesheet.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheet.tsx#L22)

___

### useTimesheetQuery

▸ **useTimesheetQuery**(`state`: [*ITimesheetState*](../interfaces/pages.itimesheetstate.md), `dispatch`: *Dispatch*<AnyAction\>): *function*

Use Timesheet query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) | State   |
`dispatch` | *Dispatch*<AnyAction\> | Dispatch    |

**Returns:** () => *Promise*<ApolloQueryResult<any\>\>

Defined in: [pages/Timesheet/hooks/useTimesheetQuery.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheetQuery.tsx#L18)
