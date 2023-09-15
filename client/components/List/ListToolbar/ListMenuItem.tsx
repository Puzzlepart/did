/* eslint-disable unicorn/consistent-function-scoping */
import { ICommandBarItemProps, Icon } from '@fluentui/react'
import { AnyAction } from '@reduxjs/toolkit'
import React, { CSSProperties, Dispatch, MouseEventHandler } from 'react'

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
  text?: string

  /**
   * The name of the menu item.
   */
  name?: string

  /**
   * The value of the menu item if it is a MenuItemCheckbox
   */
  value?: string

  /**
   * The icon to display in the menu item. A string representing a FluentIcon
   * or an Icon from `@fluentui/react` can be provided.
   */
  icon?: string

  /**
   * On click event handler.
   */
  onClick?: MouseEventHandler<any>

  /**
   * Disabled state.
   */
  disabled?: boolean

  /**
   * Checked state.
   */
  checkedValues?: Record<string, string[]>

  /**
   * The type of the menu item.
   */
  type?: 'divider' | 'header' | 'default'

  /**
   * Custom width of the menu item.
   */
  width?: string | number

  /**
   * Custom style of the menu item.
   */
  style?: CSSProperties

  /**
   * Items to render in a sub menu.
   */
  items?: ListMenuItem[]

  /**
   * Custom render function for the command bar item associated with this list menu item.
   */
  onRender?: ICommandBarItemProps['onRender']

  /**
   * The group name for the menu item.
   */
  group?: ListMenuItemGroup

  /**
   * Creates a new instance of ListMenuItem.
   *
   * @param text The text to display in the menu item (optional).
   */
  constructor(text?: string) {
    this.text = text
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
  public withIcon(iconName: string) {
    this.icon = iconName
    return this
  }

  /**
   * Sets the on click event handler for the `ListMenuItem`.
   *
   * @param onClick The on click event handler to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setOnClick(onClick: ListMenuItem['onClick']) {
    this.onClick = onClick
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
    this.onClick = () => dispatcher(action(payload))
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
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setDisabled(disabled: ListMenuItem['disabled']) {
    this.disabled = disabled
    return this
  }

  /**
   * Sets the type for the `ListMenuItem`.
   *
   * @param type The type to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setType(type: ListMenuItem['type']) {
    this.type = type
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
  public makeCheckable({ name, value }: Pick<ListMenuItem, 'name' | 'value'>) {
    this.name = name
    this.value = value
    return this
  }

  /**
   * Sets the style of the list menu item.
   *
   * @param style The style to set for the list menu item.
   *
   * @returns The updated ListMenuItem instance.
   */
  public setStyle(style: ListMenuItem['style']) {
    this.style = style
    return this
  }

  /**
   * Sets the width for the `ListMenuItem`.
   *
   * @param width The width to set.
   *
   * @returns The updated `ListMenuItem` instance.
   */
  public setWidth(width: ListMenuItem['width']) {
    this.width = width
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
    checkedValues?: ListMenuItem['checkedValues']
  ) {
    this.items = items
    if (checkedValues) this.checkedValues = checkedValues
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
    if (typeof item.icon === 'string') {
      return <Icon iconName={item.icon} />
    }
    if (item.icon) IconElement = item.icon as any
    return <IconElement />
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
