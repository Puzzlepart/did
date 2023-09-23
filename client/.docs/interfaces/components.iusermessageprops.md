[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IUserMessageProps

# Interface: IUserMessageProps

[Components](../modules/components.md).IUserMessageProps

## Hierarchy

* *Omit*<AlertProps, *action*\>

  ↳ **IUserMessageProps**

## Table of contents

### Properties

- [action](components.iusermessageprops.md#action)
- [fixedHeight](components.iusermessageprops.md#fixedheight)
- [headerText](components.iusermessageprops.md#headertext)
- [iconName](components.iusermessageprops.md#iconname)
- [onClick](components.iusermessageprops.md#onclick)
- [renderProgress](components.iusermessageprops.md#renderprogress)
- [text](components.iusermessageprops.md#text)

## Properties

### action

• `Optional` **action**: [*IUserMessageAction*](components.iusermessageaction.md)

Action to show in a menu

Defined in: [client/components/UserMessage/types.tsx:46](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L46)

___

### fixedHeight

• `Optional` **fixedHeight**: *number*

To flex the message center with a fixed height

Defined in: [client/components/UserMessage/types.tsx:41](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L41)

___

### headerText

• `Optional` **headerText**: *string*

Header text to show in **bold** _slightly larger_ font

Defined in: [client/components/UserMessage/types.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L24)

___

### iconName

• `Optional` **iconName**: *TagQuestionMark* \| *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

The name of the Fluent UI icon to display for the message (optional).

Defined in: [client/components/UserMessage/types.tsx:56](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L56)

___

### onClick

• `Optional` **onClick**: (`event`: *MouseEvent*<any, MouseEvent\>) => *void*

On click handler for the message

#### Type declaration:

▸ (`event`: *MouseEvent*<any, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *MouseEvent*<any, MouseEvent\> |

**Returns:** *void*

Defined in: [client/components/UserMessage/types.tsx:36](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L36)

Overrides: void

Defined in: [client/components/UserMessage/types.tsx:36](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L36)

___

### renderProgress

• `Optional` **renderProgress**: *boolean*

Whether to render a progress bar in the message

Defined in: [client/components/UserMessage/types.tsx:51](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L51)

___

### text

• `Optional` **text**: *string*

Text to show in the message

**`remarks`** Supports markdown

Defined in: [client/components/UserMessage/types.tsx:31](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L31)
