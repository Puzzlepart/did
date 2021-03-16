[did-client - v0.9.9](../README.md) / Components

# Module: Components

Reusable React Function components.

## Table of contents

### FilterPanel Classes

- [BaseFilter](../classes/components.basefilter.md)
- [CustomerFilter](../classes/components.customerfilter.md)
- [MonthFilter](../classes/components.monthfilter.md)
- [ProjectFilter](../classes/components.projectfilter.md)
- [ResourceFilter](../classes/components.resourcefilter.md)
- [WeekFilter](../classes/components.weekfilter.md)
- [YearFilter](../classes/components.yearfilter.md)

### Autocomplete Interfaces

- [IAutocompleteProps](../interfaces/components.iautocompleteprops.md)
- [IAutocompleteState](../interfaces/components.iautocompletestate.md)
- [ISuggestionItem](../interfaces/components.isuggestionitem.md)
- [ISuggestionItemProps](../interfaces/components.isuggestionitemprops.md)

### DurationColumn Interfaces

- [IDurationColumnProps](../interfaces/components.idurationcolumnprops.md)

### EntityLabel Interfaces

- [IEntityLabelProps](../interfaces/components.ientitylabelprops.md)

### EventList Interfaces

- [IEventListProps](../interfaces/components.ieventlistprops.md)

### FilterPanel Interfaces

- [IFilter](../interfaces/components.ifilter.md)
- [IFilterItem](../interfaces/components.ifilteritem.md)
- [IFilterPanelProps](../interfaces/components.ifilterpanelprops.md)

### PermissionList Interfaces

- [IPermissionListProps](../interfaces/components.ipermissionlistprops.md)

### UserMessage Interfaces

- [IUserMessageProps](../interfaces/components.iusermessageprops.md)

### Type aliases

- [IHotkeyModal](components.md#ihotkeymodal)

### Function Component Variables

- [Autocomplete](components.md#autocomplete)
- [ConditionalWrapper](components.md#conditionalwrapper)
- [CustomerLink](components.md#customerlink)
- [DurationColumn](components.md#durationcolumn)
- [EntityLabel](components.md#entitylabel)
- [EventList](components.md#eventlist)
- [FilterItem](components.md#filteritem)
- [HotkeyModal](components.md#hotkeymodal)
- [IconPicker](components.md#iconpicker)
- [LabelPicker](components.md#labelpicker)
- [List](components.md#list)
- [PermissionList](components.md#permissionlist)
- [ProjectLink](components.md#projectlink)
- [ProjectTooltip](components.md#projecttooltip)
- [ScrollablePaneWrapper](components.md#scrollablepanewrapper)
- [UserMessage](components.md#usermessage)

### Function Component Functions

- [DeleteLink](components.md#deletelink)
- [DisableLink](components.md#disablelink)
- [EditLink](components.md#editlink)
- [FilterPanel](components.md#filterpanel)
- [SearchCustomer](components.md#searchcustomer)
- [SearchProject](components.md#searchproject)

### Autocomplete Functions

- [SuggestionItem](components.md#suggestionitem)
- [useAutocomplete](components.md#useautocomplete)
- [useAutocompleteEvents](components.md#useautocompleteevents)

### UserMessage Functions

- [useMessage](components.md#usemessage)

## Type aliases

### IHotkeyModal

Ƭ **IHotkeyModal**: GlobalHotKeysProps & IModalProps

Defined in: [client/components/HotkeyModal/index.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/components/HotkeyModal/index.tsx#L8)

## Function Component Variables

### Autocomplete

• `Const` **Autocomplete**: *FunctionComponent*<[*IAutocompleteProps*](../interfaces/components.iautocompleteprops.md)\>

Defined in: [client/components/Autocomplete/Autocomplete.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/Autocomplete.tsx#L20)

___

### ConditionalWrapper

• `Const` **ConditionalWrapper**: *FunctionComponent*<IConditionalWrapperProps\>

Defined in: [client/components/ConditionalWrapper/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/components/ConditionalWrapper/index.tsx#L15)

___

### CustomerLink

• `Const` **CustomerLink**: *FunctionComponent*<ICustomerLinkProps\>

Defined in: [client/components/CustomerLink/index.tsx:9](https://github.com/Puzzlepart/did/blob/dev/client/components/CustomerLink/index.tsx#L9)

___

### DurationColumn

• `Const` **DurationColumn**: *FunctionComponent*<[*IDurationColumnProps*](../interfaces/components.idurationcolumnprops.md)\>

Defined in: [client/components/DurationColumn/index.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/components/DurationColumn/index.tsx#L10)

___

### EntityLabel

• `Const` **EntityLabel**: *FunctionComponent*<[*IEntityLabelProps*](../interfaces/components.ientitylabelprops.md)\>

Defined in: [client/components/EntityLabel/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/EntityLabel/index.tsx#L12)

___

### EventList

• `Const` **EventList**: *FunctionComponent*<[*IEventListProps*](../interfaces/components.ieventlistprops.md)\>

Defined in: [client/components/EventList/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/index.tsx#L11)

___

### FilterItem

• `Const` **FilterItem**: *FunctionComponent*<IFilterItemProps\>

Defined in: [client/components/FilterPanel/FilterItem/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/FilterItem/index.tsx#L12)

___

### HotkeyModal

• `Const` **HotkeyModal**: *FunctionComponent*<[*IHotkeyModal*](components.md#ihotkeymodal)\>

Defined in: [client/components/HotkeyModal/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/HotkeyModal/index.tsx#L13)

___

### IconPicker

• `Const` **IconPicker**: *FunctionComponent*<IIconPickerProps\>

Defined in: [client/components/IconPicker/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/IconPicker/index.tsx#L13)

___

### LabelPicker

• `Const` **LabelPicker**: *FunctionComponent*<ILabelPickerProps\>

Defined in: [client/components/LabelPicker/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/LabelPicker/index.tsx#L14)

___

### List

• `Const` **List**: *FunctionComponent*<IListProps\>

List component using `ShimmeredDetailsList` from `office-ui-fabric-react`.

Used by:

* EventList
* Admin/ApiTokens
* Admin/Roles
* Admin/SummaryView
* Admin/Users/AddMultiplePanel
* Admin/Users
* Customers/CustomerList
* Projects/ProjectList
* Reports
* Timesheet/SummaryView

Defined in: [client/components/List/index.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/components/List/index.tsx#L40)

___

### PermissionList

• `Const` **PermissionList**: *FunctionComponent*<[*IPermissionListProps*](../interfaces/components.ipermissionlistprops.md)\>

Defined in: [client/components/PermissionList/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/PermissionList/index.tsx#L11)

___

### ProjectLink

• `Const` **ProjectLink**: *FunctionComponent*<IProjectLinkProps\>

Defined in: [client/components/ProjectLink/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/ProjectLink/index.tsx#L11)

___

### ProjectTooltip

• `Const` **ProjectTooltip**: *FunctionComponent*<IProjectTooltipProps\>

Defined in: [client/components/ProjectTooltip/index.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/components/ProjectTooltip/index.tsx#L10)

___

### ScrollablePaneWrapper

• `Const` **ScrollablePaneWrapper**: *FunctionComponent*<any\>

Defined in: [client/components/ScrollablePaneWrapper/index.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/components/ScrollablePaneWrapper/index.tsx#L8)

___

### UserMessage

• `Const` **UserMessage**: *FunctionComponent*<[*IUserMessageProps*](../interfaces/components.iusermessageprops.md)\>

A component that supports a MessageBar with markdown using react-markdown

Defined in: [client/components/UserMessage/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/index.tsx#L18)

## Function Component Functions

### DeleteLink

▸ `Const`**DeleteLink**(`__namedParameters`: *IDeleteLinkProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *IDeleteLinkProps* |

**Returns:** *Element*

Defined in: [client/components/DeleteLink/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/DeleteLink/index.tsx#L11)

___

### DisableLink

▸ `Const`**DisableLink**(`__namedParameters`: *IDisableLinkProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *IDisableLinkProps* |

**Returns:** *Element*

Defined in: [client/components/DisableLink/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/DisableLink/index.tsx#L11)

___

### EditLink

▸ `Const`**EditLink**(`__namedParameters`: *IEditLinkProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *IEditLinkProps* |

**Returns:** *Element*

Defined in: [client/components/EditLink/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/EditLink/index.tsx#L11)

___

### FilterPanel

▸ `Const`**FilterPanel**(`props`: [*IFilterPanelProps*](../interfaces/components.ifilterpanelprops.md)): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IFilterPanelProps*](../interfaces/components.ifilterpanelprops.md) |

**Returns:** *Element*

Defined in: [client/components/FilterPanel/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/index.tsx#L12)

___

### SearchCustomer

▸ `Const`**SearchCustomer**(`props`: *ISearchCustomerProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *ISearchCustomerProps* |

**Returns:** *Element*

Defined in: [client/components/SearchCustomer/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/SearchCustomer/index.tsx#L13)

___

### SearchProject

▸ `Const`**SearchProject**(`props`: *ISearchProjectProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *ISearchProjectProps* |

**Returns:** *Element*

Defined in: [client/components/SearchProject/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/SearchProject/index.tsx#L12)

___

## Autocomplete Functions

### SuggestionItem

▸ **SuggestionItem**(`props`: [*ISuggestionItemProps*](../interfaces/components.isuggestionitemprops.md)): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*ISuggestionItemProps*](../interfaces/components.isuggestionitemprops.md) |

**Returns:** *Element*

Defined in: [client/components/Autocomplete/SuggestionItem/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/SuggestionItem/index.tsx#L11)

___

### useAutocomplete

▸ **useAutocomplete**(`props`: [*IAutocompleteProps*](../interfaces/components.iautocompleteprops.md)): *object*

Hook for Autocomplete

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IAutocompleteProps*](../interfaces/components.iautocompleteprops.md) | Props    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`className` | *string* |
`dispatch` | *Dispatch*<AnyAction\> |
`onClear` | () => *void* |
`onDismissCallout` | (`item`: *any*) => *void* |
`onKeyDown` | () => (`event`: *KeyboardEvent*<HTMLDivElement\>) => *any* |
`onSearch` | (`\_`: *any*, `searchTerm`: *string*) => *any* |
`onSetSelected` | (`index`: *number*) => *any* |
`ref` | *MutableRefObject*<HTMLDivElement\> |
`state` | [*IAutocompleteState*](../interfaces/components.iautocompletestate.md)<any\> |
`suggestions` | { `ariaLabel?`: *string* ; `data?`: *any* ; `disabled?`: *boolean* ; `hidden?`: *boolean* ; `iconName?`: *string* ; `id?`: *string* ; `index?`: *number* ; `isSelected`: *boolean* ; `itemType?`: SelectableOptionMenuItemType ; `key`: *string* \| *number* ; `searchValue`: *string* ; `secondaryText?`: *string* ; `selected?`: *boolean* ; `tag?`: *any* ; `text`: *string* ; `title?`: *string* ; `type?`: *string*  }[] |

Defined in: [client/components/Autocomplete/useAutocomplete.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/useAutocomplete.ts#L15)

___

### useAutocompleteEvents

▸ **useAutocompleteEvents**(`__namedParameters`: *Object*): *object*

Use Autocomplete events

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`onClear` | () => *void* |
`onDismissCallout` | (`item`: *any*) => *void* |
`onKeyDown` | () => (`event`: *KeyboardEvent*<HTMLDivElement\>) => *any* |
`onSearch` | (`\_`: *any*, `searchTerm`: *string*) => *any* |
`onSetSelected` | (`index`: *number*) => *any* |

Defined in: [client/components/Autocomplete/useAutocompleteEvents.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/useAutocompleteEvents.ts#L15)

___

## UserMessage Functions

### useMessage

▸ **useMessage**(): [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IUserMessageProps*](../interfaces/components.iusermessageprops.md), `duration?`: *number*) => *void*]

Hook used to show a temporarily message

**Returns:** [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IUserMessageProps*](../interfaces/components.iusermessageprops.md), `duration?`: *number*) => *void*]

Defined in: [client/components/UserMessage/useMessage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/useMessage.ts#L10)
