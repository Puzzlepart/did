[did-client - v0.10.5](../README.md) / Components

# Module: Components

Reusable React Function components.

## Table of contents

### Namespaces

- [LabelPicker](components.labelpicker.md)
- [List](components.list.md)

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

### EntityLabel Interfaces

- [IEntityLabelProps](../interfaces/components.ientitylabelprops.md)

### EventList Interfaces

- [IEventListProps](../interfaces/components.ieventlistprops.md)

### FilterPanel Interfaces

- [IFilter](../interfaces/components.ifilter.md)
- [IFilterItem](../interfaces/components.ifilteritem.md)
- [IFilterPanelProps](../interfaces/components.ifilterpanelprops.md)

### List Interfaces

- [IListColumn](../interfaces/components.ilistcolumn.md)
- [IListColumnData](../interfaces/components.ilistcolumndata.md)
- [IListGroupProps](../interfaces/components.ilistgroupprops.md)
- [IListProps](../interfaces/components.ilistprops.md)
- [IListSelectionProps](../interfaces/components.ilistselectionprops.md)
- [IListState](../interfaces/components.iliststate.md)

### Other Interfaces

- [IColorPickerFieldProps](../interfaces/components.icolorpickerfieldprops.md)
- [IDurationDisplayProps](../interfaces/components.idurationdisplayprops.md)
- [ITabContainerProps](../interfaces/components.itabcontainerprops.md)
- [ITabItemProps](../interfaces/components.itabitemprops.md)
- [IUserColumnProps](../interfaces/components.iusercolumnprops.md)

### PermissionList Interfaces

- [IPermissionListProps](../interfaces/components.ipermissionlistprops.md)

### UserMessage Interfaces

- [IUserMessageProps](../interfaces/components.iusermessageprops.md)

### Other Type aliases

- [IHotkeyModal](components.md#ihotkeymodal)
- [TabComponent](components.md#tabcomponent)
- [TabContainerComponent](components.md#tabcontainercomponent)
- [UserMessageType](components.md#usermessagetype)

### Toast Type aliases

- [IToastProps](components.md#itoastprops)

### Function Component Variables

- [FilterItem](components.md#filteritem)

### Autocomplete Variables

- [SuggestionItem](components.md#suggestionitem)

### Reusable Component Variables

- [Autocomplete](components.md#autocomplete)
- [ColorPickerField](components.md#colorpickerfield)
- [ConditionalWrapper](components.md#conditionalwrapper)
- [CustomerLink](components.md#customerlink)
- [EditLink](components.md#editlink)
- [EntityLabel](components.md#entitylabel)
- [EventList](components.md#eventlist)
- [FilterPanel](components.md#filterpanel)
- [HotkeyModal](components.md#hotkeymodal)
- [IconPicker](components.md#iconpicker)
- [IconText](components.md#icontext)
- [LabelPicker](components.md#labelpicker)
- [List](components.md#list)
- [PermissionList](components.md#permissionlist)
- [ProjectLink](components.md#projectlink)
- [ProjectTooltip](components.md#projecttooltip)
- [ScrollablePaneWrapper](components.md#scrollablepanewrapper)
- [SearchCustomer](components.md#searchcustomer)
- [SearchProject](components.md#searchproject)
- [SubText](components.md#subtext)
- [TabContainer](components.md#tabcontainer)
- [Toast](components.md#toast)
- [UserMessage](components.md#usermessage)

### SummaryView Variables

- [UserColumn](components.md#usercolumn)

### Autocomplete Functions

- [useAutocomplete](components.md#useautocomplete)
- [useAutocompleteEvents](components.md#useautocompleteevents)

### List Functions

- [useList](components.md#uselist)
- [useListGroups](components.md#uselistgroups)
- [useListProps](components.md#uselistprops)

### Other Functions

- [useUserListColumn](components.md#useuserlistcolumn)

### Reusable Component Functions

- [DeleteLink](components.md#deletelink)

### Toast Functions

- [useToast](components.md#usetoast)

### UserMessage Functions

- [useMessage](components.md#usemessage)

## Other Type aliases

### IHotkeyModal

Ƭ **IHotkeyModal**: GlobalHotKeysProps & IModalProps

Defined in: [client/components/HotkeyModal/index.tsx:9](https://github.com/Puzzlepart/did/blob/dev/client/components/HotkeyModal/index.tsx#L9)

___

### TabComponent

Ƭ **TabComponent**<T\>: *ReusableComponent*<T\>

#### Type parameters:

Name | Type | Default |
:------ | :------ | :------ |
`T` | [*ITabItemProps*](../interfaces/components.itabitemprops.md) | [*ITabItemProps*](../interfaces/components.itabitemprops.md) |

Defined in: [client/components/TabContainer/types.ts:90](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L90)

___

### TabContainerComponent

Ƭ **TabContainerComponent**: *FC*<[*ITabContainerProps*](../interfaces/components.itabcontainerprops.md)\>

Defined in: [client/components/TabContainer/types.ts:88](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L88)

___

### UserMessageType

Ƭ **UserMessageType**: *success* \| *info* \| *warning* \| *error* \| *severeWarning*

Defined in: [client/components/UserMessage/types.tsx:4](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L4)

___

## Toast Type aliases

### IToastProps

Ƭ **IToastProps**: [*IUserMessageProps*](../interfaces/components.iusermessageprops.md)

Defined in: [client/components/Toast/types.tsx:7](https://github.com/Puzzlepart/did/blob/dev/client/components/Toast/types.tsx#L7)

## Function Component Variables

### FilterItem

• `Const` **FilterItem**: *React.FC*<IFilterItemProps\>

Defined in: [client/components/FilterPanel/FilterItem/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/FilterItem/index.tsx#L12)

___

## Autocomplete Variables

### SuggestionItem

• `Const` **SuggestionItem**: *React.FC*<[*ISuggestionItemProps*](../interfaces/components.isuggestionitemprops.md)\>

Defined in: [client/components/Autocomplete/SuggestionItem/index.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/SuggestionItem/index.tsx#L11)

___

## Reusable Component Variables

### Autocomplete

• `Const` **Autocomplete**: *ReusableComponent*<[*IAutocompleteProps*](../interfaces/components.iautocompleteprops.md)\>

Autocomplete component using `<SearchBox />`, `<Callout />`,
`<FocusZone />` and `<List />` from ``.

Defined in: [client/components/Autocomplete/Autocomplete.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/Autocomplete.tsx#L25)

___

### ColorPickerField

• `Const` **ColorPickerField**: *ReusableComponent*<[*IColorPickerFieldProps*](../interfaces/components.icolorpickerfieldprops.md)\>

Field to pick an color using `<SketchPicker />` from
[react-color](https://www.npmjs.com/package/react-color)

Defined in: [client/components/ColorPickerField/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/ColorPickerField/index.tsx#L16)

___

### ConditionalWrapper

• `Const` **ConditionalWrapper**: *ReusableComponent*<IConditionalWrapperProps\>

Conditionally wraps `children` in `wrapper` based on `condition`

Defined in: [client/components/ConditionalWrapper/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/ConditionalWrapper/index.tsx#L18)

___

### CustomerLink

• `Const` **CustomerLink**: *ReusableComponent*<ICustomerLinkProps\>

Renders a `<Link />` from `react-router-dom` that
navigates to the specified customer

Defined in: [client/components/CustomerLink/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/CustomerLink/index.tsx#L13)

___

### EditLink

• `Const` **EditLink**: *React.FC*<IEditLinkProps\>

Renders a edit link using `<Icon />` and `<Link />`
from `@fluentui/react`

Defined in: [client/components/EditLink/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/EditLink/index.tsx#L14)

___

### EntityLabel

• `Const` **EntityLabel**: *ReusableComponent*<[*IEntityLabelProps*](../interfaces/components.ientitylabelprops.md)\>

The `<EntityLabel />` component is used to add contextual metadata
to a design. Visually it styles text, adds padding, and rounded corners.

Uses styles from `@primer/css`

**`see`** https://primer.style/components/Label

Defined in: [client/components/EntityLabel/index.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/EntityLabel/index.tsx#L21)

___

### EventList

• `Const` **EventList**: *ReusableComponent*<[*IEventListProps*](../interfaces/components.ieventlistprops.md)\>

Renders events in a list using `<List />` component

Supports property `additionalColumns`

Defined in: [client/components/EventList/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/index.tsx#L16)

___

### FilterPanel

• `Const` **FilterPanel**: *ReusableComponent*<[*IFilterPanelProps*](../interfaces/components.ifilterpanelprops.md)\>

Filter panel that renders filter items with more than
1 item.

`shortListCount` defaults to **10**, meaning
10 items are shown before displaying a show more link.

Defined in: [client/components/FilterPanel/index.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/index.tsx#L20)

___

### HotkeyModal

• `Const` **HotkeyModal**: *ReusableComponent*<[*IHotkeyModal*](components.md#ihotkeymodal)\>

Modal that shows the available shortcuts in the current context.

Defined in: [client/components/HotkeyModal/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/HotkeyModal/index.tsx#L16)

___

### IconPicker

• `Const` **IconPicker**: *ReusableComponent*<IIconPickerProps\>

Icon picker using `<Autocomplete />` to select
icons from `@uifabric/icons`

**`remarks`** Can be controlled with a model using props
`model` and `name`

Defined in: [client/components/IconPicker/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/IconPicker/index.tsx#L18)

___

### IconText

• `Const` **IconText**: *ReusableComponent*<IIconTextProps\>

Renders an inline `<Icon />` with text

Defined in: [client/components/IconText/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/IconText/index.tsx#L14)

___

### LabelPicker

• `Const` **LabelPicker**: *ReusableComponent*<ILabelPickerProps\>

Defined in: [client/components/LabelPicker/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/LabelPicker/index.tsx#L16)

___

### List

• `Const` **List**: *ReusableComponent*<[*IListProps*](../interfaces/components.ilistprops.md)\>

List component using `ShimmeredDetailsList` from `@fluentui/react`.

Supports list groups, selection, search box
and custom column headers.

Used by the following components:

* `<EventList />`
* `<Admin />` => `<ApiTokens />`
* `<Admin />` => `<Roles />`
* `<Admin />` => `<SummaryView />`
* `<Admin />` => `<Users />` => `<AddMultiplePanel />`
* `<Admin />` => `<Users />`
* `<Customers />` => `<CustomerList />`
* `<Projects />` => `<ProjectList />`
* `<Reports />`
* `<Timesheet />` => `<SummaryView />`

Defined in: [client/components/List/index.tsx:34](https://github.com/Puzzlepart/did/blob/dev/client/components/List/index.tsx#L34)

___

### PermissionList

• `Const` **PermissionList**: *ReusableComponent*<[*IPermissionListProps*](../interfaces/components.ipermissionlistprops.md)\>

Defined in: [client/components/PermissionList/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/PermissionList/index.tsx#L13)

___

### ProjectLink

• `Const` **ProjectLink**: *ReusableComponent*<IProjectLinkProps\>

Renders a `<Link />` from `react-router-dom` that
navigates to the specified project

Defined in: [client/components/ProjectLink/index.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/components/ProjectLink/index.tsx#L15)

___

### ProjectTooltip

• `Const` **ProjectTooltip**: *ReusableComponent*<IProjectTooltipProps\>

Shows more details about the project in a
`<TooltipHost />` from `@fluentui/react`

Defined in: [client/components/ProjectTooltip/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/ProjectTooltip/index.tsx#L14)

___

### ScrollablePaneWrapper

• `Const` **ScrollablePaneWrapper**: *ReusableComponent*<any\>

Conditionally wraps `children` in `<ScrollablePane />` based
on `condition`

Defined in: [client/components/ScrollablePaneWrapper/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/ScrollablePaneWrapper/index.tsx#L12)

___

### SearchCustomer

• `Const` **SearchCustomer**: *ReusableComponent*<ISearchCustomerProps\>

Search for customers using `<Autocomplete />`

Defined in: [client/components/SearchCustomer/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/SearchCustomer/index.tsx#L16)

___

### SearchProject

• `Const` **SearchProject**: *ReusableComponent*<ISearchProjectProps\>

Search for projects using `<Autocomplete />`

Defined in: [client/components/SearchProject/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/SearchProject/index.tsx#L14)

___

### SubText

• `Const` **SubText**: *ReusableComponent*<ISubTextProps\>

Renders sub text using color `semanticColors.bodySubtext`

**`remarks`** Has a default padding top of **4px**

Defined in: [client/components/SubText/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/SubText/index.tsx#L14)

___

### TabContainer

• `Const` **TabContainer**: [*TabContainerComponent*](components.md#tabcontainercomponent)

Flexible tab container

It's highly recommended for children of this component
to use `TabComponent`

Adds styles **display: flex** and **flex-wrap: wrap**
to make the `<Pivot >` mobile friendly

Defined in: [client/components/TabContainer/index.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/index.tsx#L20)

___

### Toast

• `Const` **Toast**: *ReusableComponent*<[*IToastProps*](components.md#itoastprops)\>

A Toast component that shows a `<UserMessage />` with
markdown using `react-markdown`

**`remarks`** Typically used with the `useToast` hook

Defined in: [client/components/Toast/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/Toast/index.tsx#L17)

___

### UserMessage

• `Const` **UserMessage**: *ReusableComponent*<[*IUserMessageProps*](../interfaces/components.iusermessageprops.md)\>

A component that supports a `<MessageBar />` with
markdown using `react-markdown`.

Defined in: [client/components/UserMessage/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/index.tsx#L17)

___

## SummaryView Variables

### UserColumn

• `Const` **UserColumn**: *ReusableComponent*<[*IUserColumnProps*](../interfaces/components.iusercolumnprops.md)\>

User column

Renders a `<Persona />` component

Defined in: [client/components/UserColumn/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/UserColumn/index.tsx#L16)

## Autocomplete Functions

### useAutocomplete

▸ **useAutocomplete**(`props`: [*IAutocompleteProps*](../interfaces/components.iautocompleteprops.md)): *object*

Hook for `<Autocomplete />`

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
`onDismissCallout` | (`item`: [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)<any\>) => *void* |
`onKeyDown` | () => (`event`: *KeyboardEvent*<HTMLDivElement\>) => *any* |
`onSearch` | (`\_event`: *any*, `searchTerm`: *string*) => *any* |
`onSetSelected` | (`index`: *number*) => *any* |
`ref` | *MutableRefObject*<HTMLDivElement\> |
`state` | [*IAutocompleteState*](../interfaces/components.iautocompletestate.md)<any\> |
`suggestions` | { `data?`: *any* ; `iconName?`: *string* ; `isSelected`: *boolean* ; `searchValue`: *string* ; `secondaryText?`: *string* ; `tag?`: *any* ; `type?`: *string*  }[] |

Defined in: [client/components/Autocomplete/useAutocomplete.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/useAutocomplete.ts#L17)

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
`onDismissCallout` | (`item`: [*ISuggestionItem*](../interfaces/components.isuggestionitem.md)<any\>) => *void* |
`onKeyDown` | () => (`event`: *KeyboardEvent*<HTMLDivElement\>) => *any* |
`onSearch` | (`\_event`: *any*, `searchTerm`: *string*) => *any* |
`onSetSelected` | (`index`: *number*) => *any* |

Defined in: [client/components/Autocomplete/useAutocompleteEvents.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/Autocomplete/useAutocompleteEvents.ts#L16)

___

## List Functions

### useList

▸ **useList**(`props`: [*IListProps*](../interfaces/components.ilistprops.md)): *object*

Component logic hook for `<List />`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IListProps*](../interfaces/components.ilistprops.md) | Props    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`dispatch` | *Dispatch*<AnyAction\> |
`listProps` | [*IListProps*](../interfaces/components.ilistprops.md)<any\> |
`state` | [*IListState*](../interfaces/components.iliststate.md)<any\> |

Defined in: [client/components/List/useList.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/List/useList.ts#L17)

___

### useListGroups

▸ **useListGroups**(`items`: *any*[], `props`: [*IListGroupProps*](../interfaces/components.ilistgroupprops.md)): *any*[][] \| readonly [IGroup[], *any*[]]

Returns list groups based on property
`listGroupProps` on the `<List />` component

#### Parameters:

Name | Type |
:------ | :------ |
`items` | *any*[] |
`props` | [*IListGroupProps*](../interfaces/components.ilistgroupprops.md) |

**Returns:** *any*[][] \| readonly [IGroup[], *any*[]]

Defined in: [client/components/List/useListGroups.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/List/useListGroups.ts#L14)

___

### useListProps

▸ **useListProps**(`__namedParameters`: UseListProps): [*IListProps*](../interfaces/components.ilistprops.md)

List props hook

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | UseListProps |

**Returns:** [*IListProps*](../interfaces/components.ilistprops.md)

Defined in: [client/components/List/useListProps.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/useListProps.ts#L31)

___

## Other Functions

### useUserListColumn

▸ **useUserListColumn**(`persona?`: IPersonaProps, `props?`: *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)\>): [*IListColumn*](../interfaces/components.ilistcolumn.md)

Returns list column definition for `<UserColumn >`

The user object needs to be the item itself, or be
on the item with key `user`

#### Parameters:

Name | Type |
:------ | :------ |
`persona` | IPersonaProps |
`props?` | *Partial*<[*IListColumn*](../interfaces/components.ilistcolumn.md)\> |

**Returns:** [*IListColumn*](../interfaces/components.ilistcolumn.md)

Defined in: [client/components/UserColumn/useUserListColumn.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/UserColumn/useUserListColumn.tsx#L14)

___

## Reusable Component Functions

### DeleteLink

▸ `Const`**DeleteLink**(`__namedParameters`: *IDeleteLinkProps*): *Element*

Renders a delete link using `<Icon />` and `<Link />`
from `@fluentui/react`

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *IDeleteLinkProps* |

**Returns:** *Element*

Defined in: [client/components/DeleteLink/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/components/DeleteLink/index.tsx#L14)

___

## Toast Functions

### useToast

▸ **useToast**(`defaultDuration?`: *number*, `defaultProps?`: [*IToastProps*](components.md#itoastprops)): readonly [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IToastProps*](components.md#itoastprops), `duration`: *number*) => *void*]

Hook used to show a temporarily `<Toast />`

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`defaultDuration` | *number* | 5000 | Default duration   |
`defaultProps` | [*IToastProps*](components.md#itoastprops) | - | Default props    |

**Returns:** readonly [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IToastProps*](components.md#itoastprops), `duration`: *number*) => *void*]

Defined in: [client/components/Toast/useToast.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/Toast/useToast.ts#L13)

___

## UserMessage Functions

### useMessage

▸ **useMessage**(): [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IUserMessageProps*](../interfaces/components.iusermessageprops.md), `duration?`: *number*) => *void*]

Hook used to show a temporarily message

**Returns:** [[*IUserMessageProps*](../interfaces/components.iusermessageprops.md), (`message`: [*IUserMessageProps*](../interfaces/components.iusermessageprops.md), `duration?`: *number*) => *void*]

Defined in: [client/components/UserMessage/useMessage.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/useMessage.ts#L10)
