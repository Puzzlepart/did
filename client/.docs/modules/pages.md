[did-client - v0.12.0](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### Namespaces

- [Admin](pages.admin.md)
- [AdminPage](pages.adminpage.md)
- [Customers](pages.customers.md)
- [CustomersPage](pages.customerspage.md)
- [Home](pages.home.md)
- [ProjectDetails](pages.projectdetails.md)
- [ProjectForm](pages.projectform.md)
- [ProjectHeader](pages.projectheader.md)
- [ProjectInformation](pages.projectinformation.md)
- [ProjectList](pages.projectlist.md)
- [ProjectTimeEntries](pages.projecttimeentries.md)
- [SaveFilterForm](pages.savefilterform.md)
- [Timesheet](pages.timesheet.md)
- [TimesheetPage](pages.timesheetpage.md)

### Enumerations

- [GetEventsOption](../enums/pages.geteventsoption.md)

### Timesheet Classes

- [TimesheetDateRange](../classes/pages.timesheetdaterange.md)
- [TimesheetPeriod](../classes/pages.timesheetperiod.md)

### Other Interfaces

- [ICustomersState](../interfaces/pages.icustomersstate.md)
- [ICustomersUrlParameters](../interfaces/pages.icustomersurlparameters.md)

### Projects Interfaces

- [IProjectFormProps](../interfaces/pages.iprojectformprops.md)
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

- [CustomersTab](pages.md#customerstab)

### Timesheet Hooks Type aliases

- [UseSubmitActionsParams](pages.md#usesubmitactionsparams)

### Function Component Variables

- [Admin](pages.md#admin)
- [Customers](pages.md#customers)
- [Projects](pages.md#projects)
- [Timesheet](pages.md#timesheet)

### Other Variables

- [ProjectsContext](pages.md#projectscontext)
- [default\_query](pages.md#default_query)

### Page Component Variables

- [AdminPage](pages.md#adminpage)
- [CustomersPage](pages.md#customerspage)
- [Home](pages.md#home)
- [ProjectsPage](pages.md#projectspage)
- [ReportsPage](pages.md#reportspage)
- [TimesheetPage](pages.md#timesheetpage)

### Projects Variables

- [ProjectDetails](pages.md#projectdetails)
- [ProjectForm](pages.md#projectform)
- [ProjectHeader](pages.md#projectheader)
- [ProjectInformation](pages.md#projectinformation)
- [ProjectList](pages.md#projectlist)
- [ProjectTimeEntries](pages.md#projecttimeentries)

### Reports Variables

- [ReportsContext](pages.md#reportscontext)
- [SaveFilterForm](pages.md#savefilterform)

### Timesheet Variables

- [TimesheetContext](pages.md#timesheetcontext)

### Other Functions

- [useMenuItems](pages.md#usemenuitems)
- [useProjectsContext](pages.md#useprojectscontext)
- [useReportsContext](pages.md#usereportscontext)

### Reports Functions

- [useCurrentMonthQuery](pages.md#usecurrentmonthquery)
- [useCurrentYearQuery](pages.md#usecurrentyearquery)
- [useForecastQuery](pages.md#useforecastquery)
- [useLastMonthQuery](pages.md#uselastmonthquery)
- [useLastYearQuery](pages.md#uselastyearquery)
- [useReportsQueries](pages.md#usereportsqueries)
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

### CustomersTab

Ƭ **CustomersTab**: *s* \| *new*

The available tabs for the Customers page.

- `s`- Search the list of customers.
- `new` - Create a new customer.

Defined in: [client/pages/Customers/types.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/types.ts#L26)

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

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L17)

## Function Component Variables

### Admin

• `Const` **Admin**: FC

Defined in: [client/pages/Admin/Admin.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L15)

___

### Customers

• `Const` **Customers**: FC

Defined in: [client/pages/Customers/Customers.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L16)

___

### Projects

• `Const` **Projects**: FC

Defined in: [client/pages/Projects/Projects.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L14)

___

### Timesheet

• `Const` **Timesheet**: FC

Defined in: [client/pages/Timesheet/Timesheet.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L19)

___

## Other Variables

### ProjectsContext

• `Const` **ProjectsContext**: *Context*<[*IProjectsContext*](../interfaces/pages.iprojectscontext.md)\>

Context object for the Projects component.

Defined in: [client/pages/Projects/context.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L24)

___

### default\_query

• `Const` **default\_query**: DocumentNode

This is a GraphQL query imported from a .gql or .graphql file.

**`see`** https://www.apollographql.com/docs/devtools/editor-plugins/

Defined in: [client/global.d.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/global.d.ts#L11)

___

## Page Component Variables

### AdminPage

• `Const` **AdminPage**: PageComponent

Admin page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [client/pages/Admin/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/index.tsx#L17)

___

### CustomersPage

• `Const` **CustomersPage**: PageComponent

Customers page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [client/pages/Customers/CustomersPage.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/CustomersPage.tsx#L16)

___

### Home

• `Const` **Home**: PageComponent

Home page

Defined in: [client/pages/Home/Home.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Home/Home.tsx#L18)

___

### ProjectsPage

• `Const` **ProjectsPage**: PageComponent

Projects page

Using `Switch`, `Route` and `useRouteMatch` from
[react-router-dom](https://www.npmjs.com/package/react-router-dom)
to support navigating between
sub components

Defined in: [client/pages/Projects/ProjectsPage.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectsPage.tsx#L17)

___

### ReportsPage

• `Const` **ReportsPage**: PageComponent

Reports page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [client/pages/Reports/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/index.tsx#L15)

___

### TimesheetPage

• `Const` **TimesheetPage**: PageComponent

Timesheet page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [client/pages/Timesheet/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/index.tsx#L16)

___

## Projects Variables

### ProjectDetails

• `Const` **ProjectDetails**: StyledComponent

Displays the details of a project, including a list of time entries.

Defined in: [client/pages/Projects/ProjectDetails/ProjectDetails.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/ProjectDetails.tsx#L13)

___

### ProjectForm

• `Const` **ProjectForm**: *TabComponent*<[*IProjectFormProps*](../interfaces/pages.iprojectformprops.md)\>

ProjectForm component is used to create and edit projects.

Defined in: [client/pages/Projects/ProjectForm/ProjectForm.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/ProjectForm.tsx#L26)

___

### ProjectHeader

• `Const` **ProjectHeader**: StyledComponent

Defined in: [client/pages/Projects/ProjectDetails/ProjectHeader/ProjectHeader.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/ProjectHeader/ProjectHeader.tsx#L14)

___

### ProjectInformation

• `Const` **ProjectInformation**: StyledComponent

Shows details about the selected project.

Defined in: [client/pages/Projects/ProjectDetails/ProjectInformation/ProjectInformation.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/ProjectInformation/ProjectInformation.tsx#L14)

___

### ProjectList

• `Const` **ProjectList**: *TabComponent*<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Project list component used by `<Projects />`. Renders
projects in a list using our `<List />` component.

Defined in: [client/pages/Projects/ProjectList/ProjectList.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/ProjectList.tsx#L21)

___

### ProjectTimeEntries

• `Const` **ProjectTimeEntries**: StyledComponent

Defined in: [client/pages/Projects/ProjectDetails/ProjectTimeEntries/ProjectTimeEntries.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/ProjectTimeEntries/ProjectTimeEntries.tsx#L14)

___

## Reports Variables

### ReportsContext

• `Const` **ReportsContext**: *Context*<[*IReportsContext*](../interfaces/pages.ireportscontext.md)\>

Defined in: [client/pages/Reports/context.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L34)

___

### SaveFilterForm

• `Const` **SaveFilterForm**: *StyledComponent*<ISaveFilterFormProps\>

Defined in: [client/pages/Reports/SaveFilterForm/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/SaveFilterForm/index.tsx#L14)

___

## Timesheet Variables

### TimesheetContext

• `Const` **TimesheetContext**: *Context*<[*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)\>

Defined in: [client/pages/Timesheet/context.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L30)

## Other Functions

### useMenuItems

▸ **useMenuItems**(): ListMenuItem[]

Returns an array of `ListMenuItem` objects to be used in the ReportsList component's menu.
The array contains a single `ListMenuItem` object representing the active filter or the default saved filters text.

**Returns:** ListMenuItem[]

An array of `ListMenuItem` objects.

Defined in: [client/pages/Reports/ReportsList/useMenuItems.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/ReportsList/useMenuItems.tsx#L14)

___

### useProjectsContext

▸ `Const`**useProjectsContext**(): [*IProjectsContext*](../interfaces/pages.iprojectscontext.md)

Returns the current value of the ProjectsContext.

**Returns:** [*IProjectsContext*](../interfaces/pages.iprojectscontext.md)

The current value of the ProjectsContext.

Defined in: [client/pages/Projects/context.tsx:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L31)

___

### useReportsContext

▸ `Const`**useReportsContext**(): [*IReportsContext*](../interfaces/pages.ireportscontext.md)

Returns the current value of the ReportsContext.

**Returns:** [*IReportsContext*](../interfaces/pages.ireportscontext.md)

The current value of the ReportsContext.

Defined in: [client/pages/Reports/context.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L41)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L58)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:119](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L119)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:149](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L149)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L27)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L91)

___

### useReportsQueries

▸ **useReportsQueries**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Use Reports Queries. Returns all queries
used in reports. Each query is generated
by a separate hook.

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:192](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L192)

___

### useSummaryQuery

▸ **useSummaryQuery**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for Summary view.

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:168](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L168)

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

Defined in: [client/pages/Reports/hooks/useReportsQuery.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQuery.ts#L36)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Defined in: [client/pages/Reports/reducer/useReportsReducer.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/reducer/useReportsReducer.ts#L17)

___

## Timesheet Functions

### useTimesheetContext

▸ `Const`**useTimesheetContext**(): [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

Returns the current context value for Timesheet using
`useContext` from `react`

**Returns:** [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

`TimesheetContext`

Defined in: [client/pages/Timesheet/context.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L40)

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

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L28)

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
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) |

Timesheet context

Defined in: [client/pages/Timesheet/hooks/useTimesheet.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheet.tsx#L21)

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

Defined in: [client/pages/Timesheet/hooks/useTimesheetQuery.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheetQuery.tsx#L18)
