[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IDynamicSearchBoxProps

# Interface: IDynamicSearchBoxProps

[Components](../modules/components.md).IDynamicSearchBoxProps

Props for the DynamicSearchBox component.

## Hierarchy

* *Omit*<SearchBoxProps, *onChange*\>

  ↳ **IDynamicSearchBoxProps**

## Table of contents

### Properties

- [clearSearchIconName](components.idynamicsearchboxprops.md#clearsearchiconname)
- [iconName](components.idynamicsearchboxprops.md#iconname)
- [onChange](components.idynamicsearchboxprops.md#onchange)
- [onClear](components.idynamicsearchboxprops.md#onclear)

## Properties

### clearSearchIconName

• `Optional` **clearSearchIconName**: *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

The name of the Fluent UI icon to use for the clear search button.

Defined in: [client/components/DynamicSearchBox/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L18)

___

### iconName

• `Optional` **iconName**: *string*

Fluent icon name to render in `contentBefore` (optional).

Defined in: [client/components/DynamicSearchBox/types.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L28)

___

### onChange

• **onChange**: (`searchTerm`: *string*) => *void*

Callback function that is called when the search term changes.

**`param`** The new search term.

#### Type declaration:

▸ (`searchTerm`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`searchTerm` | *string* |

**Returns:** *void*

Defined in: [client/components/DynamicSearchBox/types.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L13)

Defined in: [client/components/DynamicSearchBox/types.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L13)

___

### onClear

• `Optional` **onClear**: () => *void*

Callback function that is called when the clear search button is clicked (optional).

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/DynamicSearchBox/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L23)

Defined in: [client/components/DynamicSearchBox/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicSearchBox/types.ts#L23)
