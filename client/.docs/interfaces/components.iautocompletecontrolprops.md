[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IAutocompleteControlProps

# Interface: IAutocompleteControlProps<T\>

[Components](../modules/components.md).IAutocompleteControlProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* [*FormInputControlBase*](components.forminputcontrolbase.md)

* *Pick*<[*IDynamicSearchBoxProps*](components.idynamicsearchboxprops.md), *placeholder* \| *autoFocus*\>

  ↳ **IAutocompleteControlProps**

## Table of contents

### Properties

- [defaultSelectedKey](components.iautocompletecontrolprops.md#defaultselectedkey)
- [description](components.iautocompletecontrolprops.md#description)
- [errorMessage](components.iautocompletecontrolprops.md#errormessage)
- [getIcon](components.iautocompletecontrolprops.md#geticon)
- [id](components.iautocompletecontrolprops.md#id)
- [itemIcons](components.iautocompletecontrolprops.md#itemicons)
- [items](components.iautocompletecontrolprops.md#items)
- [label](components.iautocompletecontrolprops.md#label)
- [labelProps](components.iautocompletecontrolprops.md#labelprops)
- [maxHeight](components.iautocompletecontrolprops.md#maxheight)
- [model](components.iautocompletecontrolprops.md#model)
- [name](components.iautocompletecontrolprops.md#name)
- [noSuggestionsText](components.iautocompletecontrolprops.md#nosuggestionstext)
- [onSelected](components.iautocompletecontrolprops.md#onselected)
- [options](components.iautocompletecontrolprops.md#options)
- [required](components.iautocompletecontrolprops.md#required)
- [selectedKey](components.iautocompletecontrolprops.md#selectedkey)

## Properties

### defaultSelectedKey

• `Optional` **defaultSelectedKey**: *string*

Default selected key.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L56)

___

### description

• `Optional` **description**: *string*

The description for the field.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[description](components.forminputcontrolbase.md#description)

Defined in: [client/components/FormControl/Field/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L30)

___

### errorMessage

• `Optional` **errorMessage**: *string*

The error message for the field. Will be rendered using
the `UserMessage` component with `intent` set to `error`.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[errorMessage](components.forminputcontrolbase.md#errormessage)

Defined in: [client/components/FormControl/Field/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L41)

___

### getIcon

• `Optional` **getIcon**: (`item`: [*ISuggestionItem*](components.isuggestionitem.md)<T\>) => *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

Function to get an icon based on the selected item.

#### Type declaration:

▸ (`item`: [*ISuggestionItem*](components.isuggestionitem.md)<T\>): *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | [*ISuggestionItem*](components.isuggestionitem.md)<T\> |

**Returns:** *Lightbulb* \| *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync* \| *HourGlassHalf*

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L66)

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L66)

___

### id

• `Optional` **id**: *string*

Control ID for the field to store on the HTML element.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[id](components.forminputcontrolbase.md#id)

Defined in: [client/components/FormControl/Field/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L20)

___

### itemIcons

• `Optional` **itemIcons**: *boolean* \| AutocompleteControlItemIcons

Icons to be displayed next to each item.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L36)

___

### items

• `Optional` **items**: [*ISuggestionItem*](components.isuggestionitem.md)<T\>[]

Items to be displayed in the autocomplete component.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L46)

___

### label

• `Optional` **label**: *string*

The label for the field.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[label](components.forminputcontrolbase.md#label)

Defined in: [client/components/FormControl/Field/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L25)

___

### labelProps

• `Optional` **labelProps**: *IFieldLabelProps*

Label properties

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[labelProps](components.forminputcontrolbase.md#labelprops)

Defined in: [client/components/FormControl/Field/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L46)

___

### maxHeight

• `Optional` **maxHeight**: *number*

Max height of the autocomplete component.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L61)

___

### model

• `Optional` **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

Automatically bind the text control to
a model. A model is generated using the
`useMap` hook.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[model](components.forminputcontrolbase.md#model)

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L14)

___

### name

• `Optional` **name**: *string*

The `name` attribute is required for the Form Control
to work properly.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[name](components.forminputcontrolbase.md#name)

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### noSuggestionsText

• `Optional` **noSuggestionsText**: *string*

Text to be displayed when there are no suggestions.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L51)

___

### onSelected

• **onSelected**: *AutocompleteControlSelectCallback*<T\>

Callback to be called when an item is selected.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L41)

___

### options

• `Optional` **options**: [*BaseControlOptions*](../modules/components.md#basecontroloptions)

Control options

- `casing` - force value casing

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[options](components.forminputcontrolbase.md#options)

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L21)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: [FormInputControlBase](components.forminputcontrolbase.md).[required](components.forminputcontrolbase.md#required)

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)

___

### selectedKey

• `Optional` **selectedKey**: *string*

Provide the key of the selected item. This will be used to clear
the selection when the provided key is `null`.

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L31)
