[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IBreadcrumbItem

# Interface: IBreadcrumbItem

[Components](../modules/components.md).IBreadcrumbItem

Represents a single item in a breadcrumb component.

## Table of contents

### Properties

- [iconName](components.ibreadcrumbitem.md#iconname)
- [key](components.ibreadcrumbitem.md#key)
- [onClick](components.ibreadcrumbitem.md#onclick)
- [value](components.ibreadcrumbitem.md#value)

## Properties

### iconName

• `Optional` **iconName**: *Heart* \| *TagQuestionMark* \| *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

The name of the Fluent UI icon to display for the breadcrumb item.

Defined in: [client/components/Breadcrumb/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/Breadcrumb/types.ts#L22)

___

### key

• **key**: *string* \| *number*

The unique key of the breadcrumb item. Preferably a number (the
index of the item in the array)

Defined in: [client/components/Breadcrumb/types.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/components/Breadcrumb/types.ts#L12)

___

### onClick

• `Optional` **onClick**: () => *void*

The function to call when the breadcrumb item is clicked.

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/Breadcrumb/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/Breadcrumb/types.ts#L27)

Defined in: [client/components/Breadcrumb/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/Breadcrumb/types.ts#L27)

___

### value

• **value**: *string*

The text to display for the breadcrumb item.

Defined in: [client/components/Breadcrumb/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/Breadcrumb/types.ts#L17)
