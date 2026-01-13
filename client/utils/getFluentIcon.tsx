import { Icon } from '@fluentui/react'
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
 * Automatically falls back to v8 Icon component if the icon is not found in the v9 catalog.
 *
 * @param name - The name of the icon to retrieve.
 * @param options - The options to use when retrieving the icon.
 *
 * @returns The specified Fluent icon with the specified options, or a v8 Icon fallback if not found.
 */
export function getFluentIcon(
  name: string,
  options?: GetFluentIconOptions
) {
  name = _.isEmpty(name) ? options?.default : name

  // If icon exists in v9 catalog, use it
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

  // Fallback to v8 Icon for icons not yet migrated to v9
  return (
    <Icon
      iconName={name}
      style={{ color: options?.color, fontSize: options?.size }}
    />
  )
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
