[did-client - v0.11.2](../README.md) / [Pages](../modules/pages.md) / IReportsState

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

Defined in: [client/pages/Reports/types.tsx:74](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L74)

___

### filter

• `Optional` **filter**: [*IReportsSavedFilter*](pages.ireportssavedfilter.md)

Active filter

Defined in: [client/pages/Reports/types.tsx:114](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L114)

___

### groupBy

• `Optional` **groupBy**: [*IListGroupProps*](components.ilistgroupprops.md)

Group by properties

Defined in: [client/pages/Reports/types.tsx:94](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L94)

___

### isFiltered

• `Optional` **isFiltered**: *boolean*

Is filtered

Defined in: [client/pages/Reports/types.tsx:104](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L104)

___

### isFiltersOpen

• `Optional` **isFiltersOpen**: *boolean*

Filter panel open

Defined in: [client/pages/Reports/types.tsx:84](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L84)

___

### loading

• `Optional` **loading**: *boolean*

Loading

Defined in: [client/pages/Reports/types.tsx:99](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L99)

___

### preset

• `Optional` **preset**: [*IReportsQuery*](pages.ireportsquery.md)

Query preset

Defined in: [client/pages/Reports/types.tsx:89](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L89)

___

### savedFilters

• `Optional` **savedFilters**: *object*

Saved filters

#### Type declaration:

Defined in: [client/pages/Reports/types.tsx:109](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L109)

___

### subset

• `Optional` **subset**: *any*[]

Filtered subset of data.timeEntries

Defined in: [client/pages/Reports/types.tsx:79](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L79)
