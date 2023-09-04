import { Icon } from '@fluentui/react'
import {
  AddCircle24Filled,
  AddCircle24Regular,
  Alert24Filled,
  Alert24Regular,
  ArrowCircleLeft24Filled,
  ArrowCircleLeft24Regular,
  ArrowCircleRight24Filled,
  ArrowCircleRight24Regular,
  ArrowExportUp24Filled,
  ArrowExportUp24Regular,
  ArrowImport24Filled,
  ArrowImport24Regular,
  ArrowSortUpFilled,
  ArrowSortUpRegular,
  ArrowUndo24Filled,
  ArrowUndo24Regular,
  BinRecycle24Filled,
  BinRecycle24Regular,
  bundleIcon,
  CalendarAdd24Filled,
  CalendarAdd24Regular,
  CalendarCancel24Filled,
  CalendarCancel24Regular,
  CalendarMonth24Filled,
  CalendarMonth24Regular,
  CalendarSync24Filled,
  CalendarSync24Regular,
  CalendarToday24Filled,
  CalendarToday24Regular,
  CalendarWeekNumbers24Filled,
  CalendarWeekNumbers24Regular,
  CalendarWorkWeek24Filled,
  CalendarWorkWeek24Regular,
  CheckmarkCircle24Filled,
  CheckmarkCircle24Regular,
  CheckmarkFilled,
  CheckmarkRegular,
  Delete24Filled,
  Delete24Regular,
  DeleteDismiss24Filled,
  DeleteDismiss24Regular,
  DocumentDatabase24Filled,
  DocumentDatabase24Regular,
  DrinkMargarita24Filled,
  DrinkMargarita24Regular,
  EditSettings24Filled,
  EditSettings24Regular,
  Emoji24Filled,
  Emoji24Regular,
  FastForward24Filled,
  FastForward24Regular,
  Key24Filled,
  Key24Regular,
  PeopleAdd24Filled,
  PeopleAdd24Regular,
  PeopleEdit24Filled,
  PeopleEdit24Regular,
  PeopleTeam24Filled,
  PeopleTeam24Regular,
  PersonSync24Filled,
  PersonSync24Regular,
  SignOut24Filled,
  SignOut24Regular,
  StoreMicrosoft24Filled,
  StoreMicrosoft24Regular,
  System24Filled,
  System24Regular,
  TableEdit24Filled,
  TableEdit24Regular,
  Timer224Filled,
  Timer224Regular,
  Timer24Filled,
  Timer24Regular,
  WebAsset24Filled,
  WebAsset24Regular
} from '@fluentui/react-icons'
import React from 'react'

/**
 * An object containing the available Fluent icons and their corresponding regular and filled versions.
 */
const iconCatalog = {
  Emoji: {
    regular: Emoji24Regular,
    filled: Emoji24Filled
  },
  Alert: {
    regular: Alert24Regular,
    filled: Alert24Filled
  },
  ArrowExportUp: {
    regular: ArrowExportUp24Regular,
    filled: ArrowExportUp24Filled
  },
  DrinkMargarita: {
    regular: DrinkMargarita24Regular,
    filled: DrinkMargarita24Filled
  },
  EditSettings: {
    regular: EditSettings24Regular,
    filled: EditSettings24Filled
  },
  DocumentDatabase: {
    regular: DocumentDatabase24Regular,
    filled: DocumentDatabase24Filled
  },
  Key: {
    regular: Key24Regular,
    filled: Key24Filled
  },
  StoreMicrosoft: {
    regular: StoreMicrosoft24Regular,
    filled: StoreMicrosoft24Filled
  },
  ArrowSortUp: {
    regular: ArrowSortUpRegular,
    filled: ArrowSortUpFilled
  },
  Checkmark: {
    regular: CheckmarkRegular,
    filled: CheckmarkFilled
  },
  ArrowImport: {
    regular: ArrowImport24Regular,
    filled: ArrowImport24Filled
  },
  PeopleAdd: {
    regular: PeopleAdd24Regular,
    filled: PeopleAdd24Filled
  },
  PersonSync: {
    regular: PersonSync24Regular,
    filled: PersonSync24Filled
  },
  AddCircle: {
    regular: AddCircle24Regular,
    filled: AddCircle24Filled
  },
  CalendarWeekNumbers: {
    regular: CalendarWeekNumbers24Regular,
    filled: CalendarWeekNumbers24Filled
  },
  ArrowCircleLeft: {
    regular: ArrowCircleLeft24Regular,
    filled: ArrowCircleLeft24Filled
  },
  ArrowCircleRight: {
    regular: ArrowCircleRight24Regular,
    filled: ArrowCircleRight24Filled
  },
  CalendarCancel: {
    regular: CalendarCancel24Regular,
    filled: CalendarCancel24Filled
  },
  CalendarMonth: {
    regular: CalendarMonth24Regular,
    filled: CalendarMonth24Filled
  },
  CalendarSync: {
    regular: CalendarSync24Regular,
    filled: CalendarSync24Filled
  },
  CalendarToday: {
    regular: CalendarToday24Regular,
    filled: CalendarToday24Filled
  },
  CalendarWorkWeek: {
    regular: CalendarWorkWeek24Regular,
    filled: CalendarWorkWeek24Filled
  },
  CheckmarkCircle: {
    regular: CheckmarkCircle24Regular,
    filled: CheckmarkCircle24Filled
  },
  Timer: {
    regular: Timer24Regular,
    filled: Timer24Filled
  },
  PeopleTeam: {
    regular: PeopleTeam24Regular,
    filled: PeopleTeam24Filled
  },
  Timer2: {
    regular: Timer224Regular,
    filled: Timer224Filled
  },
  PeopleEdit: {
    regular: PeopleEdit24Regular,
    filled: PeopleEdit24Filled
  },
  Delete: {
    regular: Delete24Regular,
    filled: Delete24Filled
  },
  ArrowUndo: {
    regular: ArrowUndo24Regular,
    filled: ArrowUndo24Filled
  },
  FastForward: {
    regular: FastForward24Regular,
    filled: FastForward24Filled
  },
  TableEdit: {
    regular: TableEdit24Regular,
    filled: TableEdit24Filled
  },
  WebAsset: {
    regular: WebAsset24Regular,
    filled: WebAsset24Filled
  },
  System: {
    regular: System24Regular,
    filled: System24Filled
  },
  SignOut: {
    regular: SignOut24Regular,
    filled: SignOut24Filled
  },
  CalendarAdd: {
    regular: CalendarAdd24Regular,
    filled: CalendarAdd24Filled
  },
  BinRecycle: {
    regular: BinRecycle24Regular,
    filled: BinRecycle24Filled
  },
  DeleteDismiss: {
    regular: DeleteDismiss24Regular,
    filled: DeleteDismiss24Filled
  }
}

/**
 * Represents the name of a Fluent UI icon.
 */
export type FluentIconName = keyof typeof iconCatalog

/**
 * Returns the Fluent icon with the specified name.
 *
 * @param name - The name of the icon to retrieve.
 * @param bundle - Whether to bundle the filled and regular versions of the icon. Defaults to true.
 * @param color - The color to apply to the icon.
 *
 * @returns The specified Fluent icon.
 */
export function getFluentIcon(
  name: FluentIconName,
  bundle = true,
  color?: string
) {
  const icon = iconCatalog[name]
  const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
  if (!color) return <Icon />
  return <Icon style={{ color }} />
}

/**
 * Returns a Fluent UI icon component with fallback to a an icon from `@fluentui/react`.
 * 
 * @param name - The name of the icon to retrieve.
 * @param bundle - Whether to bundle the icon with other icons.
 * @param color - The color of the icon.
 * 
 * @returns A Fluent UI icon component or a default icon component if the requested icon is not found.
 */
export function getFluentIconWithFallback(name: string, bundle = true, color?: string) {
  if (iconCatalog[name]) {
    return getFluentIcon(name as FluentIconName, bundle, color)
  }
  return <Icon iconName={name} style={{ color }} />
}