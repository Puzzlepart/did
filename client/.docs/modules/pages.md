[did-client - v0.11.1](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### References

- [useReportsQueries](pages.md#usereportsqueries)

### Namespaces

- [Home](pages.home.md)
- [Timesheet](pages.timesheet.md)

### Timesheet Enumerations

- [TimesheetView](../enums/pages.timesheetview.md)

### Timesheet Classes

- [TimesheetDateRange](../classes/pages.timesheetdaterange.md)
- [TimesheetPeriod](../classes/pages.timesheetperiod.md)

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

### Reports Functions

- [useCurrentMonthQuery](pages.md#usecurrentmonthquery)
- [useCurrentYearQuery](pages.md#usecurrentyearquery)
- [useForecastQuery](pages.md#useforecastquery)
- [useLastMonthQuery](pages.md#uselastmonthquery)
- [useLastYearQuery](pages.md#uselastyearquery)
- [useQueries](pages.md#usequeries)
- [useSummaryQuery](pages.md#usesummaryquery)

### Reports Hooks Functions

- [useReports](pages.md#usereports)
- [useReportsQuery](pages.md#usereportsquery)
- [useReportsReducer](pages.md#usereportsreducer)

### Timesheet Functions

- [useTimesheetContext](pages.md#usetimesheetcontext)

### Timesheet Hooks Functions

- [useSubmitActions](pages.md#usesubmitactions)
- [useTimesheet](pages.md#usetimesheet)
- [useTimesheetQuery](pages.md#usetimesheetquery)

## References

### useReportsQueries

Renames and exports: [useQueries](pages.md#usequeries)

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

### Customers

• `Const` **Customers**: [*TabComponent*](components.md#tabcomponent)<ICustomerFormProps\>

Defined in: [client/pages/Customers/Customers.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L17)

___

### Projects

• `Const` **Projects**: FC

Defined in: [client/pages/Projects/Projects.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L15)

___

### Timesheet

• `Const` **Timesheet**: FC

Defined in: [client/pages/Timesheet/Timesheet.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L20)

___

## Other Variables

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

Defined in: [client/pages/Customers/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/index.tsx#L16)

___

### Home

• `Const` **Home**: PageComponent

Home page

Defined in: [client/pages/Home/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Home/index.tsx#L18)

___

### ProjectsPage

• `Const` **ProjectsPage**: PageComponent

Projects page

Using `Switch`, `Route` and `useRouteMatch` from
[react-router-dom](https://www.npmjs.com/package/react-router-dom)
to support navigating between
sub components

Defined in: [client/pages/Projects/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/index.tsx#L17)

___

### ReportsPage

• `Const` **ReportsPage**: PageComponent

Reports page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [client/pages/Reports/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/index.tsx#L17)

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

### Header

• `Const` **Header**: FC

Defined in: [client/pages/Projects/ProjectDetails/Header/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Header/index.tsx#L12)

___

### Information

• `Const` **Information**: FC

Defined in: [client/pages/Projects/ProjectDetails/Information/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Information/index.tsx#L13)

___

### ProjectDetails

• `Const` **ProjectDetails**: FC

Defined in: [client/pages/Projects/ProjectDetails/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/index.tsx#L14)

___

### ProjectForm

• `Const` **ProjectForm**: [*TabComponent*](components.md#tabcomponent)<IProjectFormProps\>

Defined in: [client/pages/Projects/ProjectForm/index.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/index.tsx#L25)

___

### ProjectList

• `Const` **ProjectList**: [*TabComponent*](components.md#tabcomponent)<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Project list component used by `<Projects />`. Renders
projects in a list using our `<List />` component.

Defined in: [client/pages/Projects/ProjectList/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/index.tsx#L16)

___

### ProjectsContext

• `Const` **ProjectsContext**: *Context*<[*IProjectsContext*](../interfaces/pages.iprojectscontext.md)\>

Defined in: [client/pages/Projects/context.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L18)

___

### TimeEntries

• `Const` **TimeEntries**: FC

Defined in: [client/pages/Projects/ProjectDetails/TimeEntries/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/TimeEntries/index.tsx#L14)

___

## Reports Variables

### ReportsContext

• `Const` **ReportsContext**: *Context*<[*IReportsContext*](../interfaces/pages.ireportscontext.md)\>

Defined in: [client/pages/Reports/context.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L35)

___

### SaveFilterForm

• `Const` **SaveFilterForm**: *FC*<ISaveFilterFormProps\>

Defined in: [client/pages/Reports/SaveFilterForm/index.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/SaveFilterForm/index.tsx#L25)

___

## Timesheet Variables

### TimesheetContext

• `Const` **TimesheetContext**: *Context*<[*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)\>

Defined in: [client/pages/Timesheet/context.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L30)

## Function Component Functions

### Admin

▸ `Const`**Admin**(): *Element*

**Returns:** *Element*

Defined in: [client/pages/Admin/Admin.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L18)

___

## Reports Functions

### useCurrentMonthQuery

▸ **useCurrentMonthQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_MONTH**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:54](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L54)

___

### useCurrentYearQuery

▸ **useCurrentYearQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**CURRENT_YEAR**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:110](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L110)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:140](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L140)

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

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L26)

___

### useLastYearQuery

▸ **useLastYearQuery**(`query?`: *any*): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for preset
**LAST_YEAR**

**`remarks`** Made as generic so it can also be used by
`<UserReports />` which are using `IChoiceGroupOption`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | GraphQL query    |

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L84)

___

### useQueries

▸ **useQueries**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Use queries

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:182](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L182)

___

### useSummaryQuery

▸ **useSummaryQuery**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Returns query properties for
Summary view

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)

Defined in: [client/pages/Reports/hooks/useReportsQueries.ts:160](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L160)

___

## Reports Hooks Functions

### useReports

▸ **useReports**(): *object*

Component logic for `<Reports />`

* Get history using `useHistory`
* Get URL params using `useParams`
* Get queries using `useQueries`
* Using reducer `useReportsReducer`
* Using `useReportQuery`
* Layout effect (`useLayoutEffect`) for updating URL
  and executing the lazy query in `useReportQuery` when
  changing query
  when the query is reloaded

**Returns:** *object*

Name | Type |
:------ | :------ |
`context` | *object* |
`context.dispatch` | *Dispatch*<AnyAction\> |
`context.state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |
`context.t` | *TFunction*<*translation*, undefined\> |
`defaultSelectedKey` | *string* |
`filters` | [*BaseFilter*](../classes/components.basefilter.md)[] |
`onClearFilters` | *any* |
`options` | *IChoiceGroupOption*[] |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] |

Defined in: [client/pages/Reports/hooks/useReports.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReports.ts#L28)

___

### useReportsQuery

▸ **useReportsQuery**(`__namedParameters`: *Object*, `fetchPolicy?`: FetchPolicy): *function*

Hook for Reports Query.

Using `useLazyQuery` and `useLayoutEffect` and dispatches
`DATA_UPDATED` action on query changes.

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`__namedParameters` | *Object* | - | - |
`fetchPolicy` | FetchPolicy | 'no-cache' | Fetch policy (defaults to `no-cache`)    |

**Returns:** (`options?`: *QueryLazyOptions*<any\>) => *void*

Defined in: [client/pages/Reports/hooks/useReportsQuery.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQuery.ts#L17)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Defined in: [client/pages/Reports/reducer/useReportsReducer.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/reducer/useReportsReducer.ts#L18)

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
`headerButtonProps` | *object* |
`headerButtonProps.disabled` | *boolean* |
`headerButtonProps.style` | { `opacity`: *number* = 0.4 } \| { `opacity`: *undefined* = 0.4 } |
`onSubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`onUnsubmitPeriod` | (`forecast`: *boolean*) => *Promise*<void\> |
`state` | [*ITimesheetState*](../interfaces/pages.itimesheetstate.md) |

Timesheet context

Defined in: [client/pages/Timesheet/hooks/useTimesheet.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheet.tsx#L22)

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
