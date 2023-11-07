import { Icon } from '@fluentui/react'
import { bundleIcon } from '@fluentui/react-icons'
import React, { CSSProperties } from 'react'
import { iconCatalog } from 'theme/iconCatalog'

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
}

/**
 * Returns the Fluent icon with the specified name.
 *
 * @param name - The name of the icon to retrieve.
 * @param options - The options to use when retrieving the icon.
 *
 * @returns The specified Fluent icon with the specified options, or null if the icon is not found
 * in the catalog.
 */
export function getFluentIcon(
  name: FluentIconName,
  options?: GetFluentIconOptions
) {
  if (!iconCatalog[name]) return null
  const bundle = options?.bundle ?? true
  const color = options?.color
  const size = options?.size
  const filled = options?.filled ?? false
  const icon = iconCatalog[name]
  const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
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
  return <Icon {...props} filled={filled} />
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

/**
 * Returns a Fluent UI icon component with fallback to a an icon from `@fluentui/react`.
 *
 * @param name - The name of the icon to retrieve.
 * @param options . The options to use when retrieving the icon.
 *
 * @returns A Fluent UI icon component or a default icon component if the requested icon is not found.
 */
export function getFluentIconWithFallback(
  name: string,
  options?: GetFluentIconOptions
) {
  if (iconCatalog[name]) {
    return getFluentIcon(name as FluentIconName, options)
  }
  return <Icon iconName={name} style={{ color: options?.color }} />
}
