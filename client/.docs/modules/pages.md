[did-client - v0.9.11](../README.md) / Pages

# Module: Pages

This module contains the main pages.

All are built using React Function components and Hooks.

## Table of contents

### References

- [useReportsQueries](pages.md#usereportsqueries)

### Namespaces

- [Home](pages.home.md)

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

### Other Type aliases

- [UseSubmitActionsHook](pages.md#usesubmitactionshook)

### Timesheet Type aliases

- [TimesheetView](pages.md#timesheetview)

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

### Tab Component Variables

- [ApiTokens](pages.md#apitokens)
- [Labels](pages.md#labels)
- [Roles](pages.md#roles)
- [SubscriptionSettings](pages.md#subscriptionsettings)
- [Users](pages.md#users)

### Timesheet Variables

- [TimesheetContext](pages.md#timesheetcontext)

### Function Component Functions

- [Admin](pages.md#admin)

### Other Functions

- [useTimesheetContext](pages.md#usetimesheetcontext)

### Reports Functions

- [currentMonthQuery](pages.md#currentmonthquery)
- [currentYearQuery](pages.md#currentyearquery)
- [forecastQuery](pages.md#forecastquery)
- [lastMonthQuery](pages.md#lastmonthquery)
- [lastYearQuery](pages.md#lastyearquery)
- [summaryQuery](pages.md#summaryquery)
- [useQueries](pages.md#usequeries)

### Reports Hooks Functions

- [useReports](pages.md#usereports)
- [useReportsQuery](pages.md#usereportsquery)
- [useReportsReducer](pages.md#usereportsreducer)

### Timesheet Hooks Functions

- [useSubmitActions](pages.md#usesubmitactions)
- [useTimesheet](pages.md#usetimesheet)
- [useTimesheetQuery](pages.md#usetimesheetquery)

## References

### useReportsQueries

Renames and exports: [useQueries](pages.md#usequeries)

## Other Type aliases

### UseSubmitActionsHook

Ƭ **UseSubmitActionsHook**: *ReturnType*<*typeof* [*useSubmitActions*](pages.md#usesubmitactions)\>

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L8)

___

## Timesheet Type aliases

### TimesheetView

Ƭ **TimesheetView**: *overview* \| *summary* \| *allocation*

Defined in: [pages/Timesheet/types.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L9)

## Function Component Variables

### Customers

• `Const` **Customers**: [*TabComponent*](components.md#tabcomponent)<ICustomerFormProps\>

Defined in: [pages/Customers/Customers.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/Customers.tsx#L18)

___

### Projects

• `Const` **Projects**: React.FC

Defined in: [pages/Projects/Projects.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/Projects.tsx#L16)

___

### Timesheet

• `Const` **Timesheet**: React.FC

Defined in: [pages/Timesheet/Timesheet.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/Timesheet.tsx#L22)

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

Defined in: [pages/Customers/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Customers/index.tsx#L17)

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
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Projects/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/index.tsx#L17)

___

### ReportsPage

• `Const` **ReportsPage**: PageComponent

Reports page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Reports/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/index.tsx#L17)

___

### TimesheetPage

• `Const` **TimesheetPage**: PageComponent

Timesheet page

Using `Switch`, `Route` and `useRouteMatch` from
`react-router-dom` to support navigating between
sub components

Defined in: [pages/Timesheet/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/index.tsx#L17)

___

## Projects Variables

### Header

• `Const` **Header**: React.FC

Defined in: [pages/Projects/ProjectDetails/Header/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Header/index.tsx#L12)

___

### Information

• `Const` **Information**: React.FC

Defined in: [pages/Projects/ProjectDetails/Information/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/Information/index.tsx#L15)

___

### ProjectDetails

• `Const` **ProjectDetails**: React.FC

Defined in: [pages/Projects/ProjectDetails/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/index.tsx#L15)

___

### ProjectForm

• `Const` **ProjectForm**: [*TabComponent*](components.md#tabcomponent)<IProjectFormProps\>

Defined in: [pages/Projects/ProjectForm/index.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectForm/index.tsx#L23)

___

### ProjectList

• `Const` **ProjectList**: [*TabComponent*](components.md#tabcomponent)<[*IProjectListProps*](../interfaces/pages.iprojectlistprops.md)\>

Project list component used by `<Projects />`. Renders
projects in a list using our `<List />` component.

Defined in: [pages/Projects/ProjectList/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/index.tsx#L17)

___

### ProjectsContext

• `Const` **ProjectsContext**: *Context*<[*IProjectsContext*](../interfaces/pages.iprojectscontext.md)\>

Defined in: [pages/Projects/context.tsx:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L19)

___

### TimeEntries

• `Const` **TimeEntries**: React.FC

Defined in: [pages/Projects/ProjectDetails/TimeEntries/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectDetails/TimeEntries/index.tsx#L15)

___

## Reports Variables

### ReportsContext

• `Const` **ReportsContext**: *Context*<[*IReportsContext*](../interfaces/pages.ireportscontext.md)\>

Defined in: [pages/Reports/context.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/context.ts#L36)

___

### SaveFilterForm

• `Const` **SaveFilterForm**: *React.FC*<ISaveFilterFormProps\>

Defined in: [pages/Reports/SaveFilterForm/index.tsx:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/SaveFilterForm/index.tsx#L27)

___

## Tab Component Variables

### ApiTokens

• `Const` **ApiTokens**: [*TabComponent*](components.md#tabcomponent)

Component for handling API tokens.

* See created API tokens
* Create new API tokens
* Delete existing API tokens

Defined in: [pages/Admin/ApiTokens/index.tsx:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/ApiTokens/index.tsx#L27)

___

### Labels

• `Const` **Labels**: [*TabComponent*](components.md#tabcomponent)

Defined in: [pages/Admin/Labels/index.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Labels/index.tsx#L10)

___

### Roles

• `Const` **Roles**: [*TabComponent*](components.md#tabcomponent)

Defined in: [pages/Admin/Roles/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Roles/index.tsx#L14)

___

### SubscriptionSettings

• `Const` **SubscriptionSettings**: [*TabComponent*](components.md#tabcomponent)

Defined in: [pages/Admin/Subscription/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Subscription/index.tsx#L14)

___

### Users

• `Const` **Users**: [*TabComponent*](components.md#tabcomponent)

Manage users

* See active users
* Add new users
* Edit users

Defined in: [pages/Admin/Users/index.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Users/index.tsx#L20)

___

## Timesheet Variables

### TimesheetContext

• `Const` **TimesheetContext**: *Context*<[*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)\>

Defined in: [pages/Timesheet/context.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L31)

## Function Component Functions

### Admin

▸ `Const`**Admin**(): *Element*

**Returns:** *Element*

Defined in: [pages/Admin/Admin.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Admin/Admin.tsx#L18)

___

## Other Functions

### useTimesheetContext

▸ `Const`**useTimesheetContext**(): [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

Returns the current context value for Timesheet using
`useContext` from `react`

**Returns:** [*ITimesheetContext*](../interfaces/pages.itimesheetcontext.md)

`TimesheetContext`

Defined in: [pages/Timesheet/context.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L39)

___

## Reports Functions

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L57)

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:114](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L114)

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:142](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L142)

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:29](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L29)

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:85](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L85)

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

Defined in: [pages/Reports/hooks/useReportsQueries.ts:163](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L163)

___

### useQueries

▸ **useQueries**(): [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Use queries

**Returns:** [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]

Defined in: [pages/Reports/hooks/useReportsQueries.ts:189](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQueries.ts#L189)

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
* Layout effect (`useLayoutEffect`) for updating URL when changing query
  when the query is reloaded

**Returns:** *object*

Name | Type |
:------ | :------ |
`context` | *object* |
`context.dispatch` | *Dispatch*<AnyAction\> |
`context.state` | [*IReportsState*](../interfaces/pages.ireportsstate.md) |
`context.t` | TFunction |
`filters` | [*BaseFilter*](../classes/components.basefilter.md)[] |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] |

Defined in: [pages/Reports/hooks/useReports.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReports.ts#L25)

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

Defined in: [pages/Reports/hooks/useReportsQuery.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/hooks/useReportsQuery.ts#L15)

___

### useReportsReducer

▸ **useReportsReducer**(`queries`: [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[]): [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Use Reports reducer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*IReportsQuery*](../interfaces/pages.ireportsquery.md)[] | Queries    |

**Returns:** [[*IReportsState*](../interfaces/pages.ireportsstate.md), *Dispatch*<AnyAction\>]

Defined in: [pages/Reports/reducer/useReportsReducer.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/reducer/useReportsReducer.ts#L16)

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

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L15)

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

Defined in: [pages/Timesheet/hooks/useTimesheet.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useTimesheet.tsx#L23)

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
