import {
  AddCircle24Filled,
  AddCircle24Regular,
  ArrowCircleLeft24Filled,
  ArrowCircleLeft24Regular,
  ArrowCircleRight24Filled,
  ArrowCircleRight24Regular,
  ArrowImport24Filled,
  ArrowImport24Regular,
  ArrowSortUpFilled,
  ArrowSortUpRegular,
  ArrowUndo24Filled,
  ArrowUndo24Regular,
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
  CheckmarkFilled,
  CheckmarkRegular,
  Delete24Filled,
  Delete24Regular,
  FastForward24Filled,
  FastForward24Regular,
  PeopleAdd24Filled,
  PeopleAdd24Regular,
  PeopleEdit24Filled,
  PeopleEdit24Regular,
  PeopleTeam24Filled,
  PeopleTeam24Regular,
  PersonSync24Filled,
  PersonSync24Regular,
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

const iconCatalog = {
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
  CalendarAdd: {
    regular: CalendarAdd24Regular,
    filled: CalendarAdd24Filled
  }
}

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
export function getFluentIcon(name: FluentIconName, bundle = true, color?) {
  const icon = iconCatalog[name]
  const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
  return <Icon style={{ color }} />
}
