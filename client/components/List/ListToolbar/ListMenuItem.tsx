/* eslint-disable unicorn/switch-case-braces */
/* eslint-disable unicorn/consistent-function-scoping */
import { ICommandBarItemProps, Icon } from '@fluentui/react'
import { MenuItemCheckboxProps } from '@fluentui/react-components'
import { AnyAction } from '@reduxjs/toolkit'
import React, { CSSProperties, Dispatch, MouseEventHandler } from 'react'
import { FluentIconName, getFluentIconWithFallback } from 'utils'

export type ListMenuItemGroup = 'default' | 'actions'

/**
 * Represents a menu item in the `ListMenuItem` component. Supports
 * the Fluent API pattern using e.g. `new ListMenuItem().setIcon(...)`,
 * `new ListMenuItem().setOnClick(...)`, etc.
 */
export class ListMenuItem {
  /**
   * The text to display in the menu item.
   */
  private _text?: string

  /**
   * The name of the menu item.
   */
  private _name?: string

  /**
   * The title (tooltip) of the menu item.
   */
  private _title?: string

  /**
   * The value of the menu item if it is a MenuItemCheckbox
   */
  private _value?: string

  /**
   * The icon to display in the menu item. A string representing a FluentIcon
   * or an Icon from `@fluentui/react` can be provided.
   */
  private _iconName?: string | FluentIconName

  /**
   * On click event handler.
   */
  private _onClick?: MouseEventHandler<any>

  /**
   * Disabled state.
   */
  private _disabled?: boolean

  /**
   * Hidden state.
   */
  public hidden?: boolean

  /**
   * Checked state.
   */
  private _checkedValues?: Record<string, string[]>

  /**
   * The type of the menu item.
   */
  private _type?: 'divider' | 'header' | 'default'

  /**
   * Custom width of the menu item.
   */
  private _width?: string | number

  /**
   * Custom style of the menu item.
   */
  private _style?: CSSProperties

  /**
   * Items to render in a sub menu.
   */
  public items?: ListMenuItem[]

  /**
   * Custom render function for the command bar item associated with this list menu item.
   */
  public onRender?: ICommandBarItemProps['onRender']

  /**
   * The group name for the menu item.
   */
  public group?: ListMenuItemGroup

  /**
   * Creates a new instance of ListMenuItem.
   *
   * @param text The text to display in the menu item (optional).
   */
  constructor(text?: string) {
    this._text = text
  }

  /**
   * Sets the icon for the `ListMenuItem`.
   *
   * @param iconName The FluentIcon or string representing the icon to set.
   *
   * with the FluentIcon provided in `icon` (optional).
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public withIcon(iconName: string | FluentIconName) {
    this._iconName = iconName
    return this
  }

  /**
   * Sets the on click event handler for the `ListMenuItem`.
   *
   * @param onClick The on click event handler to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setOnClick(onClick: ListMenuItem['_onClick']) {
    this._onClick = onClick
    return this
  }

  /**
   * Attaches a dispatch function to the onClick event of the ListMenuItem component.
   *
   * @param context - The context object containing the dispatch function.
   * @param action - The action to be dispatched.
   * @param payload - The payload to be passed to the action.
   *
   * @returns The updated ListMenuItem component with the dispatch function attached to its onClick event.
   */
  public withDispatch(context: any, action: any, payload: any = null) {
    const dispatcher = context.dispatch as Dispatch<AnyAction>
    this._onClick = () => dispatcher(action(payload))
    return this
  }

  /**
   * Sets the group for the `ListMenuItem`.
   *
   * @param group Group name for the menu item
   */
  public setGroup(group: ListMenuItemGroup) {
    this.group = group
    return this
  }

  /**
   * Sets the disabled state for the `ListMenuItem`.
   *
   * @param disabled The disabled state to set.
   * @param disabledTooltip The tooltip to display when the menu item is disabled.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setDisabled(disabled: ListMenuItem['_disabled']) {
    this._disabled = disabled
    return this
  }

  /**
   * Sets the hidden state for the `ListMenuItem`.
   *
   * @param hidden The hidden state to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setHidden(hidden: ListMenuItem['hidden']) {
    this.hidden = hidden
    return this
  }

  /**
   * Sets the type for the `ListMenuItem`.
   *
   * @param type The type to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setType(type: ListMenuItem['_type']) {
    this._type = type
    return this
  }

  /**
   * Makes the ListMenuItem checkable.
   *
   * @param name The name of the checkable item.
   * @param value The value of the checkable item.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public makeCheckable({
    name,
    value
  }: Pick<MenuItemCheckboxProps, 'name' | 'value'>) {
    this._name = name
    this._value = value
    return this
  }

  /**
   * Sets the style of the list menu item.
   *
   * @param style The style to set for the list menu item.
   *
   * @returns The updated ListMenuItem instance.
   */
  public setStyle(style: ListMenuItem['_style']) {
    this._style = style
    return this
  }

  /**
   * Sets the width for the `ListMenuItem`.
   *
   * @param width The width to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setWidth(width: ListMenuItem['_width']) {
    this._width = width
    return this
  }

  /**
   * Sets the items and checked values of the `ListMenuItem`.
   *
   * @param items The new items to set.
   * @param checkedValues The new checked values to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setItems(
    items: ListMenuItem['items'],
    checkedValues?: ListMenuItem['_checkedValues']
  ) {
    this.items = items
    if (checkedValues) this._checkedValues = checkedValues
    return this
  }

  /**
   * Sets the condition for the `ListMenuItem`.
   * If the condition is false, the `ListMenuItem` will not be rendered.
   * If the condition is true, the `ListMenuItem` will be rendered.
   *
   * @param condition The condition to set.
   */
  public makeConditional(condition: boolean) {
    if (!condition) return null
    return this
  }

  /**
   * Sets a custom render function for the command bar item associated with this list menu item.
   *
   * @param onRender - The custom render function for the command bar item.
   *
   * @returns The updated ListMenuItem instance.
   */
  public setCustomRender(onRender: ICommandBarItemProps['onRender']) {
    this.onRender = onRender
    return this
  }

  /**
   * Creates an icon component based on the provided list menu item.
   * Supports both `FluentIcon` from `@fluentui/react-icons` and
   * `Icon` from `@fluentui/react`.
   *
   * @param item - The list menu item to create the icon for.
   *
   * @returns The icon component.
   */
  public static createIcon(item: ListMenuItem) {
    let IconElement = () => null
    if (typeof item._iconName === 'string') {
      return <Icon iconName={item._iconName} />
    }
    if (item._iconName) IconElement = item._iconName as any
    return <IconElement />
  }

  public get text() {
    return this._text
  }

  /**
   * Converts an array of ICommandBarItemProps to an array of ListMenuItem.
   *
   * @param items - The array of ICommandBarItemProps to convert.
   *
   * @returns An array of ListMenuItem.
   */
  public static convert(items: ICommandBarItemProps[]) {
    return items.map((item) =>
      new ListMenuItem(item.text)
        .withIcon(item.iconProps?.iconName)
        .setOnClick(item.onClick)
        .setDisabled(item.disabled)
    )
  }

  /**
   * Get the type of the component to render.
   *
   * - `custom` if the `onRender` prop is set.
   * - `menu` (Menu + MenuList) if the `items` prop is set.
   * - `button` (ToolbarButton) otherwise.
   */
  public get componentType():
    | 'custom'
    | 'menu'
    | 'menu_item_checkbox'
    | 'button' {
    if (this.onRender) return 'custom'
    else if (this.items) return 'menu'
    else if (this._value) return 'menu_item_checkbox'
    return 'button'
  }

  /**
   * Creates a CSS style object for the ListMenuItem component.
   * @param additionalStyle - An optional object containing additional CSS properties to be merged with the default style.
   * @returns A CSSProperties object representing the style of the ListMenuItem component.
   */
  private _createStyle(additionalStyle?: CSSProperties): CSSProperties {
    const style: CSSProperties = {
      ...this._style,
      ...additionalStyle
    }
    if (this._width) {
      style.width = this._width
      style.minWidth = this._width
    }
    switch (this._type) {
      /**
       * The `ListMenuItem` is a header and should be bold and 12px.
       */
      case 'header': {
        {
          style.fontWeight = 'bold'
          style.fontSize = 12
        }
        break
      }
      /**
       * The `ListMenuItem` is a divider and should have a border top and a height of 1px.
       */
      case 'divider': {
        {
          style.borderTop = '1px solid #eaeaea'
          style.height = '1px'
          style.minHeight = '1px'
        }
        break
      }
    }
    return style
  }

  /**
   * Creates props for the component based on its type.
   *
   * @template T - The type of the props object to be returned.
   *
   * @param options - An object containing additional options.
   * @param options.additionalStyles={} - Additional styles to be applied to the component.
   *
   * @returns - The props object for the component.
   */
  public createProps<T>({
    additionalStyles = {}
  }: { additionalStyles?: CSSProperties } = {}) {
    let props: Record<string, any> = {}
    switch (this.componentType) {
      case 'menu_item_checkbox':
        {
          props = {
            name: this._name,
            value: this._value,
            content: this._text
          }
        }
        break
      case 'menu':
        {
          const hasCheckmarks = this.items.some(({ _value: value }) => !!value)
          const hasIcons = this.items.some(({ _iconName: icon }) => !!icon)
          props = {
            hasCheckmarks,
            hasIcons,
            checkedValues: this._checkedValues
          }
        }
        break
    }
    if (this._iconName) props.icon = getFluentIconWithFallback(this._iconName)
    if (this._onClick) props.onClick = this._onClick
    props.disabled = this._disabled
    props.title = this._title
    props.style = this._createStyle(additionalStyles)
    return props as T
  }
}

/**
 * A divider menu item for the list toolbar.
 */
export const ListMenuItemDivider = new ListMenuItem().setType('divider')

/**
 * Creates a new ListMenuItem with the specified text as a header and sets its style to have a font size of 10.
 *
 * @param text The text to display in the header.
 *
 * @returns A new ListMenuItem with the specified text as a header and a font size of 10.
 */
export const ListMenuItemHeader = (text: string) =>
  new ListMenuItem(text).setType('header')
