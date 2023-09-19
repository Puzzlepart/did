[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IIconPickerControlProps

# Interface: IIconPickerControlProps

[Components](../modules/components.md).IIconPickerControlProps

## Hierarchy

* *Omit*<[*IAutocompleteControlProps*](components.iautocompletecontrolprops.md)<any\>, *onSelected*\>

  ↳ **IIconPickerControlProps**

## Table of contents

### Properties

- [defaultSelected](components.iiconpickercontrolprops.md#defaultselected)
- [defaultSelectedKey](components.iiconpickercontrolprops.md#defaultselectedkey)
- [description](components.iiconpickercontrolprops.md#description)
- [errorMessage](components.iiconpickercontrolprops.md#errormessage)
- [getIcon](components.iiconpickercontrolprops.md#geticon)
- [id](components.iiconpickercontrolprops.md#id)
- [includeFluentIcons](components.iiconpickercontrolprops.md#includefluenticons)
- [itemIcons](components.iiconpickercontrolprops.md#itemicons)
- [items](components.iiconpickercontrolprops.md#items)
- [label](components.iiconpickercontrolprops.md#label)
- [labelProps](components.iiconpickercontrolprops.md#labelprops)
- [maxHeight](components.iiconpickercontrolprops.md#maxheight)
- [model](components.iiconpickercontrolprops.md#model)
- [name](components.iiconpickercontrolprops.md#name)
- [noSuggestionsText](components.iiconpickercontrolprops.md#nosuggestionstext)
- [onSelected](components.iiconpickercontrolprops.md#onselected)
- [options](components.iiconpickercontrolprops.md#options)
- [required](components.iiconpickercontrolprops.md#required)
- [selectedKey](components.iiconpickercontrolprops.md#selectedkey)

## Properties

### defaultSelected

• `Optional` **defaultSelected**: *string*

Default selected icon

Defined in: [client/components/FormControl/IconPickerControl/types.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/IconPickerControl/types.tsx#L8)

___

### defaultSelectedKey

• `Optional` **defaultSelectedKey**: *string*

Default selected key.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L56)

___

### description

• `Optional` **description**: *string*

The description for the field.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L30)

___

### errorMessage

• `Optional` **errorMessage**: *string*

The error message for the field. Will be rendered using
the `UserMessage` component with `intent` set to `error`.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L41)

___

### getIcon

• `Optional` **getIcon**: (`item`: [*ISuggestionItem*](components.isuggestionitem.md)<any\>) => *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync*

Function to get an icon based on the selected item.

#### Type declaration:

▸ (`item`: [*ISuggestionItem*](components.isuggestionitem.md)<any\>): *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | [*ISuggestionItem*](components.isuggestionitem.md)<any\> |

**Returns:** *ListBar* \| *ContentSettings* \| *BuildingSkyscraper* \| *Home* \| *ContentView* \| *Eye* \| *NoteEdit* \| *LinkEdit* \| *Edit* \| *TableCellEdit* \| *PersonEdit* \| *TextBulletListSquareEdit* \| *Dismiss* \| *TagMultiple* \| *KeyMultiple* \| *Umbrella* \| *Person* \| *PersonProhibited* \| *SelectAllOff* \| *WeatherSunnyLow* \| *Cloud* \| *Timeline* \| *Collections* \| *Info* \| *CalendarPlay* \| *CalendarClock* \| *Emoji* \| *Alert* \| *ArrowExportUp* \| *DrinkMargarita* \| *EditSettings* \| *DocumentDatabase* \| *Key* \| *StoreMicrosoft* \| *ArrowSortUp* \| *Checkmark* \| *ArrowImport* \| *PeopleAdd* \| *PersonSync* \| *AddCircle* \| *CalendarWeekNumbers* \| *ArrowCircleLeft* \| *ArrowCircleRight* \| *CalendarCancel* \| *CalendarMonth* \| *CalendarSync* \| *CalendarToday* \| *CalendarWorkWeek* \| *CheckmarkCircle* \| *Timer* \| *PeopleTeam* \| *Timer2* \| *PeopleEdit* \| *Delete* \| *ArrowUndo* \| *FastForward* \| *TableEdit* \| *WebAsset* \| *System* \| *SignOut* \| *CalendarAdd* \| *BinRecycle* \| *DeleteDismiss* \| *ArrowSync*

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L66)

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L66)

___

### id

• `Optional` **id**: *string*

Control ID for the field to store on the HTML element.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L20)

___

### includeFluentIcons

• `Optional` **includeFluentIcons**: *boolean*

Include icons from Fluent UI 2 in the suggestions.

Defined in: [client/components/FormControl/IconPickerControl/types.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/IconPickerControl/types.tsx#L20)

___

### itemIcons

• `Optional` **itemIcons**: *boolean* \| AutocompleteControlItemIcons

Icons to be displayed next to each item.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L36)

___

### items

• `Optional` **items**: [*ISuggestionItem*](components.isuggestionitem.md)<any\>[]

Items to be displayed in the autocomplete component.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L46)

___

### label

• `Optional` **label**: *string*

The label for the field.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L25)

___

### labelProps

• `Optional` **labelProps**: *IFieldLabelProps*

Label properties

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L46)

___

### maxHeight

• `Optional` **maxHeight**: *number*

Max height of the autocomplete component.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L61)

___

### model

• `Optional` **model**: [*TypedMap*](hooks.typedmap.md)<unknown, unknown, unknown\>

Automatically bind the text control to
a model. A model is generated using the
`useMap` hook.

Inherited from: void

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L14)

___

### name

• `Optional` **name**: *string*

The `name` attribute is required for the Form Control
to work properly.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L15)

___

### noSuggestionsText

• `Optional` **noSuggestionsText**: *string*

Text to be displayed when there are no suggestions.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L51)

___

### onSelected

• `Optional` **onSelected**: (`icon`: *string*) => *void*

On selected callback for the icon picker.
If not specified `model` and `name` should
be specified instead.

#### Type declaration:

▸ (`icon`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`icon` | *string* |

**Returns:** *void*

Defined in: [client/components/FormControl/IconPickerControl/types.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/IconPickerControl/types.tsx#L15)

Defined in: [client/components/FormControl/IconPickerControl/types.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/IconPickerControl/types.tsx#L15)

___

### options

• `Optional` **options**: [*BaseControlOptions*](../modules/components.md#basecontroloptions)

Control options

- `casing` - force value casing

Inherited from: void

Defined in: [client/components/FormControl/types/FormInputControlBase.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/types/FormInputControlBase.ts#L21)

___

### required

• `Optional` **required**: *boolean*

Whether the field is required or not.

Inherited from: void

Defined in: [client/components/FormControl/Field/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/Field/types.ts#L35)

___

### selectedKey

• `Optional` **selectedKey**: *string*

Provide the key of the selected item. This will be used to clear
the selection when the provided key is `null`.

Inherited from: void

Defined in: [client/components/FormControl/AutocompleteControl/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/FormControl/AutocompleteControl/types.ts#L31)
