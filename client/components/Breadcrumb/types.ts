import { HTMLAttributes } from 'react'
import { FluentIconName } from 'utils'

/**
 * Represents a single item in a breadcrumb component.
 */
export interface IBreadcrumbItem {
  /**
   * The unique key of the breadcrumb item. Preferably a number (the
   * index of the item in the array)
   */
  key: number | string

  /**
   * The text to display for the breadcrumb item.
   */
  value: string

  /**
   * The name of the Fluent UI icon to display for the breadcrumb item.
   */
  iconName?: FluentIconName

  /**
   * The function to call when the breadcrumb item is clicked.
   */
  onClick?: () => void
}

export interface IBreadcrumbComponentProps extends HTMLAttributes<any> {
  items: IBreadcrumbItem[]
}
