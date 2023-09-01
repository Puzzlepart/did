import {
  ArrowUndo24Filled,
  ArrowUndo24Regular,
  bundleIcon,
  CalendarCancel24Filled,
  CalendarCancel24Regular,
  FastForward24Filled,
  FastForward24Regular
} from '@fluentui/react-icons'
import React from 'react'

const iconCatalog = {
  CalendarCancel: {
    regular: CalendarCancel24Regular,
    filled: CalendarCancel24Filled
  },
  ArrowUndo: {
    regular: ArrowUndo24Regular,
    filled: ArrowUndo24Filled
  },
  FastForward: {
    regular: FastForward24Regular,
    filled: FastForward24Filled
  }
}

/**
 * Returns the Fluent icon with the specified name.
 *
 * @param name - The name of the icon to retrieve.
 * @param bundle - Whether to bundle the filled and regular versions of the icon. Defaults to true.
 *
 * @returns The specified Fluent icon.
 */
export function getFluentIcon(name: keyof typeof iconCatalog, bundle = true) {
  const icon = iconCatalog[name]
  const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
  return <Icon />
}
