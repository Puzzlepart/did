import { bundleIcon } from '@fluentui/react-icons'
import React, { CSSProperties } from 'react'
import { iconCatalog } from 'theme/iconCatalog'
import _ from 'lodash'

/**
 * Represents the name of a Fluent UI icon.
 */
export type FluentIconName = keyof typeof iconCatalog

const legacyIconAliases: Record<string, FluentIconName> = {
  Add: 'Add',
  AwayStatus: 'PresenceAway',
  BusinessHoursSign: 'CalendarClock',
  Calendar: 'Calendar',
  CalendarDay: 'CalendarDay',
  CalendarReply: 'CalendarReply',
  CalendarWeek: 'CalendarWeekNumbers',
  EatDrink: 'DrinkMargarita',
  Emoji2: 'EmojiLaugh',
  EmojiDisappointed: 'EmojiSad',
  EmojiNeutral: 'EmojiMeh',
  EmojiTabSymbols: 'EmojiMultiple',
  FabricUserFolder: 'Folder',
  LineChart: 'ChartMultiple',
  Page: 'Document',
  Previous: 'Previous',
  ProjectIcon: 'Briefcase',
  Refresh: 'ArrowSync',
  ReminderPerson: 'PersonClock',
  Sad: 'EmojiSadSlight',
  Storyboard: 'WebAsset',
  TaskGroupMirrored: 'GroupList',
  TestIcon: 'ErrorCircle',
  Telemarketer: 'Person',
  TimeSheet: 'CalendarWorkWeek'
}

const missingIconWarnings = new Set<string>()

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
 * @returns The specified Fluent icon with the specified options, or a fallback icon if not found.
 */
export function getFluentIcon(
  name: string,
  options?: GetFluentIconOptions
): React.ReactElement | null {
  // Handle null/undefined/empty names
  if (_.isEmpty(name) && _.isEmpty(options?.default)) {
    return null
  }

  const resolvedName = _.isEmpty(name) ? options?.default : name
  const aliasName = legacyIconAliases[resolvedName] ?? resolvedName

  const hasAlias = _.has(iconCatalog, aliasName)
  const fallbackName = options?.default
  const hasFallback = !hasAlias && fallbackName && _.has(iconCatalog, fallbackName)
  const iconName = hasAlias ? aliasName : (hasFallback ? fallbackName : null)

  // Return icon if it exists in v9 catalog or if a fallback is provided
  if (iconName) {
    const bundle = options?.bundle ?? true
    const color = options?.color
    const size = options?.size
    const filled = options?.filled ?? false
    const icon = iconCatalog[iconName]
    const IconComponent = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
    const props: { style?: CSSProperties; title?: string } = {
      title: options?.title ?? iconName
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

  // Icon not found in catalog - use fallback
  if (process.env.NODE_ENV === 'development' && !missingIconWarnings.has(aliasName)) {
    missingIconWarnings.add(aliasName)
    console.warn(`[getFluentIcon] Icon "${aliasName}" not found in catalog, using fallback`)
  }

  // Return fallback icon (ErrorCircle)
  const fallbackIcon = iconCatalog['ErrorCircle']
  if (fallbackIcon) {
    const FallbackComponent = bundleIcon(fallbackIcon.filled, fallbackIcon.regular)
    const props: { style?: CSSProperties; title?: string } = {
      title: `Missing icon: ${aliasName}`
    }
    if (options?.color) props.style = { color: options.color }
    if (options?.size) {
      props.style = {
        ...props.style,
        width: options.size,
        height: options.size
      }
    }
    return <FallbackComponent {...props} />
  }

  // Ultimate fallback if even ErrorCircle doesn't exist
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
