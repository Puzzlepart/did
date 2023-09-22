[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IUserMessageProps

# Interface: IUserMessageProps

[Components](../modules/components.md).IUserMessageProps

## Hierarchy

* *AlertProps*

  ↳ **IUserMessageProps**

## Table of contents

### Properties

- [actions](components.iusermessageprops.md#actions)
- [fixedHeight](components.iusermessageprops.md#fixedheight)
- [headerText](components.iusermessageprops.md#headertext)
- [iconName](components.iusermessageprops.md#iconname)
- [onClick](components.iusermessageprops.md#onclick)
- [renderProgress](components.iusermessageprops.md#renderprogress)
- [text](components.iusermessageprops.md#text)

## Properties

### actions

• `Optional` **actions**: [*UserMessageAction*](../modules/components.md#usermessageaction)[]

Actions to show in a menu

Defined in: [client/components/UserMessage/types.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L40)

___

### fixedHeight

• `Optional` **fixedHeight**: *number*

To flex the message center with a fixed height

Defined in: [client/components/UserMessage/types.tsx:35](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L35)

___

### headerText

• `Optional` **headerText**: *string*

Header text to show in **bold** _slightly larger_ font

Defined in: [client/components/UserMessage/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L18)

___

### iconName

• `Optional` **iconName**: *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

The name of the Fluent UI icon to display for the message (optional).

Defined in: [client/components/UserMessage/types.tsx:50](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L50)

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

Defined in: [client/components/UserMessage/types.tsx:30](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L30)

Overrides: void

Defined in: [client/components/UserMessage/types.tsx:30](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L30)

___

### renderProgress

• `Optional` **renderProgress**: *boolean*

Whether to render a progress bar in the message

Defined in: [client/components/UserMessage/types.tsx:45](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L45)

___

### text

• `Optional` **text**: *string*

Text to show in the message

**`remarks`** Supports markdown

Defined in: [client/components/UserMessage/types.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L25)
