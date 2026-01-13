import { bundleIcon } from '@fluentui/react-icons'
import React, { CSSProperties } from 'react'
import { iconCatalog } from 'theme/iconCatalog'
import _ from 'lodash'

/**
 * Represents the name of a Fluent UI icon.
 */
export type FluentIconName = keyof typeof iconCatalog

type GetFluentIconOptions = {
  /**
   * Whether to bundle the icon with the filled version. Defaults to true.
   */
  bundle?: boolean

  /**
   * The `color` of the icon.
   */
  color?: string

  /**
   * The `size` of the icon.
   */
  size?: string | number

  /**
   * Whether to use the filled version of the icon. Defaults to `false`.
   */
  filled?: boolean

  /**
   * The title of the icon.
   */
  title?: string

  /**
   * The default icon to use if the specified icon is not found in the catalog.
   */
  default?: string
}

/**
 * Returns the Fluent icon with the specified name.
 *
 * @param name - The name of the icon to retrieve.
 * @param options - The options to use when retrieving the icon.
 *
 * @returns The specified Fluent icon with the specified options, or null if not found in catalog.
 */
export function getFluentIcon(
  name: string,
  options?: GetFluentIconOptions
) {
  name = _.isEmpty(name) ? options?.default : name

  // Return icon if it exists in v9 catalog
  if (_.has(iconCatalog, name)) {
    const bundle = options?.bundle ?? true
    const color = options?.color
    const size = options?.size
    const filled = options?.filled ?? false
    const icon = iconCatalog[name]
    const IconComponent = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
    const props: { style?: CSSProperties; title?: string } = {
      title: options?.title
    }
    if (color) props.style = { color }
    if (size) {
      props.style = {
        ...props.style,
        width: size,
        height: size
      }
    }
    return <IconComponent {...props} filled={filled} />
  }

  // Icon not found in catalog
  return null
}

/**
 * Returns an array of strings representing the names of all available Fluent icons.
 *
 * @returns An array of strings representing the names of all available Fluent icons.
 */
export function getFluentIcons() {
  return Object.keys(iconCatalog).map((key) => ({
    name: key,
    hasFilledIcon: !!iconCatalog[key].filled
  }))
}
