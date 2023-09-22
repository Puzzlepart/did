[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IUserMessageAction

# Interface: IUserMessageAction

[Components](../modules/components.md).IUserMessageAction

Represents an action that can be performed on a user message.

## Hierarchy

* *Pick*<[*IDynamicButtonProps*](components.idynamicbuttonprops.md), *text* \| *iconName* \| *disabled* \| *onClick*\>

  ↳ **IUserMessageAction**

## Table of contents

### Properties

- [iconColor](components.iusermessageaction.md#iconcolor)
- [iconName](components.iusermessageaction.md#iconname)
- [text](components.iusermessageaction.md#text)

## Properties

### iconColor

• `Optional` **iconColor**: *string*

Defined in: [client/components/UserMessage/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L13)

___

### iconName

• `Optional` **iconName**: *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

Icon name to use for the button.

Inherited from: void

Defined in: [client/components/DynamicButton/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L16)

___

### text

• `Optional` **text**: *string*

Text to display on the button. This is not natively supported as a prop on
the `Button` component from `@fluentui/react-components`.

Inherited from: void

Defined in: [client/components/DynamicButton/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/DynamicButton/types.ts#L22)
