[did-client - v0.10.0](../README.md) / [Pages](../modules/pages.md) / IReportsQueryPresetItem

# Interface: IReportsQueryPresetItem

[Pages](../modules/pages.md).IReportsQueryPresetItem

## Hierarchy

* *IContextualMenuItem*

  ↳ **IReportsQueryPresetItem**

## Table of contents

### Properties

- [ariaLabel](pages.ireportsquerypresetitem.md#arialabel)
- [canCheck](pages.ireportsquerypresetitem.md#cancheck)
- [checked](pages.ireportsquerypresetitem.md#checked)
- [className](pages.ireportsquerypresetitem.md#classname)
- [componentRef](pages.ireportsquerypresetitem.md#componentref)
- [customOnRenderListLength](pages.ireportsquerypresetitem.md#customonrenderlistlength)
- [data](pages.ireportsquerypresetitem.md#data)
- [disabled](pages.ireportsquerypresetitem.md#disabled)
- [exportFileName](pages.ireportsquerypresetitem.md#exportfilename)
- [getItemClassNames](pages.ireportsquerypresetitem.md#getitemclassnames)
- [getSplitButtonVerticalDividerClassNames](pages.ireportsquerypresetitem.md#getsplitbuttonverticaldividerclassnames)
- [href](pages.ireportsquerypresetitem.md#href)
- [iconProps](pages.ireportsquerypresetitem.md#iconprops)
- [inactive](pages.ireportsquerypresetitem.md#inactive)
- [itemProps](pages.ireportsquerypresetitem.md#itemprops)
- [itemType](pages.ireportsquerypresetitem.md#itemtype)
- [key](pages.ireportsquerypresetitem.md#key)
- [keytipProps](pages.ireportsquerypresetitem.md#keytipprops)
- [name](pages.ireportsquerypresetitem.md#name)
- [onClick](pages.ireportsquerypresetitem.md#onclick)
- [onMouseDown](pages.ireportsquerypresetitem.md#onmousedown)
- [onRender](pages.ireportsquerypresetitem.md#onrender)
- [onRenderIcon](pages.ireportsquerypresetitem.md#onrendericon)
- [primaryDisabled](pages.ireportsquerypresetitem.md#primarydisabled)
- [query](pages.ireportsquerypresetitem.md#query)
- [rel](pages.ireportsquerypresetitem.md#rel)
- [role](pages.ireportsquerypresetitem.md#role)
- [secondaryText](pages.ireportsquerypresetitem.md#secondarytext)
- [sectionProps](pages.ireportsquerypresetitem.md#sectionprops)
- [shortCut](pages.ireportsquerypresetitem.md#shortcut)
- [split](pages.ireportsquerypresetitem.md#split)
- [style](pages.ireportsquerypresetitem.md#style)
- [subMenuProps](pages.ireportsquerypresetitem.md#submenuprops)
- [submenuIconProps](pages.ireportsquerypresetitem.md#submenuiconprops)
- [target](pages.ireportsquerypresetitem.md#target)
- [text](pages.ireportsquerypresetitem.md#text)
- [title](pages.ireportsquerypresetitem.md#title)

## Properties

### ariaLabel

• `Optional` **ariaLabel**: *string*

Optional accessibility label (aria-label) attribute that will be stamped on to the element.
If none is specified, the aria-label attribute will contain the item name

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:376

___

### canCheck

• `Optional` **canCheck**: *boolean*

Whether or not this menu item can be checked

**`defaultvalue`** false

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:301

___

### checked

• `Optional` **checked**: *boolean*

Whether or not this menu item is currently checked.

**`defaultvalue`** false

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:306

___

### className

• `Optional` **className**: *string*

Additional CSS class to apply to the menu item.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:366

___

### componentRef

• `Optional` **componentRef**: *IRefObject*<IContextualMenuRenderItem\>

Optional callback to access the IContextualMenuRenderItem interface.
This will get passed down to ContextualMenuItem.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:253

___

### customOnRenderListLength

• `Optional` **customOnRenderListLength**: *number*

When rendering a custom menu component that is passed in, the component might also be a list of
elements. We want to keep track of the correct index our menu is using based off of
the length of the custom list. It is up to the user to increment the count for their list.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:407

___

### data

• `Optional` **data**: *any*

Any custom data the developer wishes to associate with the menu item.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:315

___

### disabled

• `Optional` **disabled**: *boolean*

Whether the menu item is disabled

**`defaultvalue`** false

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:287

___

### exportFileName

• **exportFileName**: *string*

Export file name

Defined in: [client/pages/Reports/types.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L15)

___

### getItemClassNames

• `Optional` **getItemClassNames**: (`theme`: ITheme, `disabled`: *boolean*, `expanded`: *boolean*, `checked`: *boolean*, `isAnchorLink`: *boolean*, `knownIcon`: *boolean*, `itemClassName?`: *string*, `dividerClassName?`: *string*, `iconClassName?`: *string*, `subMenuClassName?`: *string*, `primaryDisabled?`: *boolean*) => IMenuItemClassNames

Method to provide the classnames to style the individual items inside a menu.

**`deprecated`** Use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.

#### Type declaration:

▸ (`theme`: ITheme, `disabled`: *boolean*, `expanded`: *boolean*, `checked`: *boolean*, `isAnchorLink`: *boolean*, `knownIcon`: *boolean*, `itemClassName?`: *string*, `dividerClassName?`: *string*, `iconClassName?`: *string*, `subMenuClassName?`: *string*, `primaryDisabled?`: *boolean*): IMenuItemClassNames

#### Parameters:

Name | Type |
:------ | :------ |
`theme` | ITheme |
`disabled` | *boolean* |
`expanded` | *boolean* |
`checked` | *boolean* |
`isAnchorLink` | *boolean* |
`knownIcon` | *boolean* |
`itemClassName?` | *string* |
`dividerClassName?` | *string* |
`iconClassName?` | *string* |
`subMenuClassName?` | *string* |
`primaryDisabled?` | *boolean* |

**Returns:** IMenuItemClassNames

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:347

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:347

___

### getSplitButtonVerticalDividerClassNames

• `Optional` **getSplitButtonVerticalDividerClassNames**: (`theme`: ITheme) => IVerticalDividerClassNames

Method to provide the classnames to style the Vertical Divider of a split button inside a menu.
Default value is the `getSplitButtonVerticalDividerClassNames` func defined in `ContextualMenu.classnames.ts`.

**`defaultvalue`** getSplitButtonVerticalDividerClassNames

#### Type declaration:

▸ (`theme`: ITheme): IVerticalDividerClassNames

#### Parameters:

Name | Type |
:------ | :------ |
`theme` | ITheme |

**Returns:** IVerticalDividerClassNames

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:357

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:357

___

### href

• `Optional` **href**: *string*

Navigate to this URL when the menu item is clicked.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:325

___

### iconProps

• `Optional` **iconProps**: *IIconProps*

Props for the Icon.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:274

___

### inactive

• `Optional` **inactive**: *boolean*

This prop is no longer used. All contextual menu items are now focusable when disabled.

**`deprecated`** in 6.38.2 will be removed in 7.0.0

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:420

___

### itemProps

• `Optional` **itemProps**: *Partial*<IContextualMenuItemProps\>

Optional IContextualMenuItemProps overrides to customize behaviors such as item styling via `styles`.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:351

___

### itemType

• `Optional` **itemType**: ContextualMenuItemType

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:270

___

### key

• **key**: *string*

Unique id to identify the item

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:257

___

### keytipProps

• `Optional` **keytipProps**: IKeytipProps

Keytip for this contextual menu item

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:411

___

### name

• `Optional` **name**: *string*

Text description for the menu item to display
If a standard dash (-) is passed in, then the item will be rendered as a divider
If a dash must appear as text then the alternatives of
emdash (—), figuredash (‒), or minus symbol (−)
can be used instead

**`deprecated`** Use `text` instead.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:429

___

### onClick

• `Optional` **onClick**: (`ev?`: *KeyboardEvent*<HTMLElement\> \| *MouseEvent*<HTMLElement, MouseEvent\>, `item?`: IContextualMenuItem) => *boolean* \| *void*

Callback for when the menu item is invoked. If `ev.preventDefault()` is called in `onClick`,
the click will not close the menu.
Returning true will dismiss the menu even if `ev.preventDefault()` was called.

#### Type declaration:

▸ (`ev?`: *KeyboardEvent*<HTMLElement\> \| *MouseEvent*<HTMLElement, MouseEvent\>, `item?`: IContextualMenuItem): *boolean* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`ev?` | *KeyboardEvent*<HTMLElement\> \| *MouseEvent*<HTMLElement, MouseEvent\> |
`item?` | IContextualMenuItem |

**Returns:** *boolean* \| *void*

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:321

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:321

___

### onMouseDown

• `Optional` **onMouseDown**: (`item`: IContextualMenuItem, `event`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void*

A function to be executed on mouse down. This is executed before an `onClick` event and can
be used to interrupt native on click events as well. The click event should still handle
the commands. This should only be used in special cases when react and non-react are mixed.

#### Type declaration:

▸ (`item`: IContextualMenuItem, `event`: *MouseEvent*<HTMLElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | IContextualMenuItem |
`event` | *MouseEvent*<HTMLElement, MouseEvent\> |

**Returns:** *void*

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:397

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:397

___

### onRender

• `Optional` **onRender**: (`item`: *any*, `dismissMenu`: (`ev?`: *any*, `dismissAll?`: *boolean*) => *void*) => ReactNode

Method to custom render this menu item.
For keyboard accessibility, the top-level rendered item should be a focusable element
(like an anchor or a button) or have the `data-is-focusable` property set to true.

**`param`** Item to render. Will typically be of type `IContextualMenuItem`.
(When rendering a command bar item, will be `ICommandBarItemProps`.)

**`param`** Function to dismiss the menu. Can be used to ensure that a custom menu
item click dismisses the menu. (Will be undefined if rendering a command bar item.)

#### Type declaration:

▸ (`item`: *any*, `dismissMenu`: (`ev?`: *any*, `dismissAll?`: *boolean*) => *void*): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *any* |
`dismissMenu` | (`ev?`: *any*, `dismissAll?`: *boolean*) => *void* |

**Returns:** ReactNode

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:391

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:391

___

### onRenderIcon

• `Optional` **onRenderIcon**: *IRenderFunction*<IContextualMenuItemProps\>

Custom render function for the menu item icon

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:278

___

### primaryDisabled

• `Optional` **primaryDisabled**: *boolean*

If the menu item is a split button, this prop disables purely the primary action of the button.

**`defaultvalue`** false

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:292

___

### query

• **query**: *any*

Defined in: [client/pages/Reports/types.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L10)

___

### rel

• `Optional` **rel**: *string*

Link relation setting when using `href`.
If `target` is `_blank`, `rel` is defaulted to a value to prevent clickjacking.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:334

___

### role

• `Optional` **role**: *string*

Optional override for the menu button's role. Defaults to `menuitem` or `menuitemcheckbox`.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:401

___

### secondaryText

• `Optional` **secondaryText**: *string*

Seconday description for the menu item to display

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:269

___

### sectionProps

• `Optional` **sectionProps**: *IContextualMenuSection*

Properties to apply to render this item as a section.
This prop is mutually exclusive with `subMenuProps`.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:362

___

### shortCut

• `Optional` **shortCut**: *string*

**`deprecated`** Not used

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:296

___

### split

• `Optional` **split**: *boolean*

Whether or not this menu item is a splitButton.

**`defaultvalue`** false

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:311

___

### style

• `Optional` **style**: *CSSProperties*

Additional styles to apply to the menu item

**`deprecated`** in favor of the `styles` prop to leverage mergeStyles API.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:371

___

### subMenuProps

• `Optional` **subMenuProps**: *IContextualMenuProps*

Properties to apply to a submenu to this item.

The ContextualMenu will provide default values for `target`, `onDismiss`, `isSubMenu`,
`id`, `shouldFocusOnMount`, `directionalHint`, `className`, and `gapSpace`, all of which
can be overridden.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:342

___

### submenuIconProps

• `Optional` **submenuIconProps**: *IIconProps*

Props for the Icon used for the chevron.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:282

___

### target

• `Optional` **target**: *string*

Target window when using `href`.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:329

___

### text

• `Optional` **text**: *string*

Text description for the menu item to display
If a standard dash (-) is passed in, then the item will be rendered as a divider
If a dash must appear as text then the alternatives of
emdash (—), figuredash (‒), or minus symbol (−)
can be used instead

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:265

___

### title

• `Optional` **title**: *string*

Optional title for displaying text when hovering over an item.

Defined in: node_modules/office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types.d.ts:380
