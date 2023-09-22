[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IDynamicButtonProps

# Interface: IDynamicButtonProps

[Components](../modules/components.md).IDynamicButtonProps

## Hierarchy

* *PartialButtonProps*

* *Pick*<HTMLProps<HTMLDivElement\>, *hidden* \| *className*\>

  ↳ **IDynamicButtonProps**

## Table of contents

### Properties

- [fadeIn](components.idynamicbuttonprops.md#fadein)
- [iconName](components.idynamicbuttonprops.md#iconname)
- [primary](components.idynamicbuttonprops.md#primary)
- [secondary](components.idynamicbuttonprops.md#secondary)
- [subtle](components.idynamicbuttonprops.md#subtle)
- [text](components.idynamicbuttonprops.md#text)
- [triggerFor](components.idynamicbuttonprops.md#triggerfor)

## Properties

### fadeIn

• `Optional` **fadeIn**: *boolean*

Defined in: [client/components/DynamicButton/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L44)

___

### iconName

• `Optional` **iconName**: *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

Icon name to use for the button.

Defined in: [client/components/DynamicButton/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L16)

___

### primary

• `Optional` **primary**: *boolean*

Shortcut to set the button as primary.

Defined in: [client/components/DynamicButton/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L27)

___

### secondary

• `Optional` **secondary**: *boolean*

Shortcut to set the button as secondary.

Defined in: [client/components/DynamicButton/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L32)

___

### subtle

• `Optional` **subtle**: *boolean*

Shortcut to set the button as subtle.

Defined in: [client/components/DynamicButton/types.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L37)

___

### text

• `Optional` **text**: *string*

Text to display on the button. This is not natively supported as a prop on
the `Button` component from `@fluentui/react-components`.

Defined in: [client/components/DynamicButton/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L22)

___

### triggerFor

• `Optional` **triggerFor**: *Menu* \| *Popover*

Renders the button as a trigge for `Menu` or `Popover`.

Defined in: [client/components/DynamicButton/types.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L42)
