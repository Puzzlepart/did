[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IAutocompleteProps

# Interface: IAutocompleteProps<T\>

[Components](../modules/components.md).IAutocompleteProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* *ISearchBoxProps*

  ↳ **IAutocompleteProps**

## Table of contents

### Properties

- [defaultSelectedKey](components.iautocompleteprops.md#defaultselectedkey)
- [description](components.iautocompleteprops.md#description)
- [errorMessage](components.iautocompleteprops.md#errormessage)
- [itemIcons](components.iautocompleteprops.md#itemicons)
- [items](components.iautocompleteprops.md#items)
- [label](components.iautocompleteprops.md#label)
- [maxHeight](components.iautocompleteprops.md#maxheight)
- [noSuggestionsText](components.iautocompleteprops.md#nosuggestionstext)
- [onSelected](components.iautocompleteprops.md#onselected)
- [selectedKey](components.iautocompleteprops.md#selectedkey)

## Properties

### defaultSelectedKey

• `Optional` **defaultSelectedKey**: *string*

Default selected key.

Defined in: [components/Autocomplete/types.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L61)

___

### description

• `Optional` **description**: *string*

Description for the autocomplete component.

Defined in: [components/Autocomplete/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L36)

___

### errorMessage

• `Optional` **errorMessage**: *string*

Error message to be displayed.

Defined in: [components/Autocomplete/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L66)

___

### itemIcons

• `Optional` **itemIcons**: *boolean* \| AutocompleteItemIcons

Icons to be displayed next to each item.

Defined in: [components/Autocomplete/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L41)

___

### items

• `Optional` **items**: [*ISuggestionItem*](components.isuggestionitem.md)<T\>[]

Items to be displayed in the autocomplete component.

Defined in: [components/Autocomplete/types.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L51)

___

### label

• `Optional` **label**: *string*

Label for the autocomplete component.

Defined in: [components/Autocomplete/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L25)

___

### maxHeight

• `Optional` **maxHeight**: *number*

Max height of the autocomplete component.

Defined in: [components/Autocomplete/types.ts:71](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L71)

___

### noSuggestionsText

• `Optional` **noSuggestionsText**: *string*

Text to be displayed when there are no suggestions.

Defined in: [components/Autocomplete/types.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L56)

___

### onSelected

• **onSelected**: *AutocompleteSelectCallback*<T\>

Callback to be called when an item is selected.

Defined in: [components/Autocomplete/types.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L46)

___

### selectedKey

• `Optional` **selectedKey**: *string*

Provide the key of the selected item. This will be used to clear
the selection when the provided key is `null`.

Defined in: [components/Autocomplete/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/types.ts#L31)
