[did-client - v0.9.9](../README.md) / [Pages](../modules/pages.md) / IReportsState

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

Defined in: [client/pages/Reports/types.tsx:72](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L72)

___

### filter

• `Optional` **filter**: [*IReportsSavedFilter*](pages.ireportssavedfilter.md)

Active filter

Defined in: [client/pages/Reports/types.tsx:112](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L112)

___

### groupBy

• `Optional` **groupBy**: IListGroups

Group by properties

Defined in: [client/pages/Reports/types.tsx:92](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L92)

___

### isFiltered

• `Optional` **isFiltered**: *boolean*

Is filtered

Defined in: [client/pages/Reports/types.tsx:102](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L102)

___

### isFiltersOpen

• `Optional` **isFiltersOpen**: *boolean*

Filter panel open

Defined in: [client/pages/Reports/types.tsx:82](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L82)

___

### loading

• `Optional` **loading**: *boolean*

Loading

Defined in: [client/pages/Reports/types.tsx:97](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L97)

___

### preset

• `Optional` **preset**: [*IReportsQuery*](pages.ireportsquery.md)

Query preset

Defined in: [client/pages/Reports/types.tsx:87](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L87)

___

### savedFilters

• `Optional` **savedFilters**: *object*

Saved filters

#### Type declaration:

Defined in: [client/pages/Reports/types.tsx:107](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L107)

___

### subset

• `Optional` **subset**: *any*[]

Filtered subset of data.timeEntries

Defined in: [client/pages/Reports/types.tsx:77](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L77)
