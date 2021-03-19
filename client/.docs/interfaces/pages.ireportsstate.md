[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / IReportsState

# Interface: IReportsState

[Pages](../modules/pages.md).IReportsState

## Table of contents

### Properties

- [data](pages.ireportsstate.md#data)
- [filter](pages.ireportsstate.md#filter)
- [groupBy](pages.ireportsstate.md#groupby)
- [isFiltered](pages.ireportsstate.md#isfiltered)
- [isFiltersOpen](pages.ireportsstate.md#isfiltersopen)
- [loading](pages.ireportsstate.md#loading)
- [preset](pages.ireportsstate.md#preset)
- [savedFilters](pages.ireportsstate.md#savedfilters)
- [subset](pages.ireportsstate.md#subset)

## Properties

### data

• `Optional` **data**: [*IReportsData*](pages.ireportsdata.md)

Data

Defined in: [client/pages/Reports/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L75)

___

### filter

• `Optional` **filter**: [*IReportsSavedFilter*](pages.ireportssavedfilter.md)

Active filter

Defined in: [client/pages/Reports/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L115)

___

### groupBy

• `Optional` **groupBy**: IListGroupProps

Group by properties

Defined in: [client/pages/Reports/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L95)

___

### isFiltered

• `Optional` **isFiltered**: *boolean*

Is filtered

Defined in: [client/pages/Reports/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L105)

___

### isFiltersOpen

• `Optional` **isFiltersOpen**: *boolean*

Filter panel open

Defined in: [client/pages/Reports/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L85)

___

### loading

• `Optional` **loading**: *boolean*

Loading

Defined in: [client/pages/Reports/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L100)

___

### preset

• `Optional` **preset**: [*IReportsQuery*](pages.ireportsquery.md)

Query preset

Defined in: [client/pages/Reports/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L90)

___

### savedFilters

• `Optional` **savedFilters**: *object*

Saved filters

#### Type declaration:

Defined in: [client/pages/Reports/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L110)

___

### subset

• `Optional` **subset**: *any*[]

Filtered subset of data.timeEntries

Defined in: [client/pages/Reports/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L80)
