import { Icon } from '@fluentui/react'
import {
  TagQuestionMarkRegular,
  TagQuestionMarkFilled,
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
  ArrowSync24Filled,
  ArrowSync24Regular,
  ArrowUndo24Filled,
  ArrowUndo24Regular,
  BinRecycle24Filled,
  BinRecycle24Regular,
  BuildingSkyscraperFilled,
  BuildingSkyscraperRegular,
  bundleIcon,
  CalendarAdd24Filled,
  CalendarAdd24Regular,
  CalendarCancel24Filled,
  CalendarCancel24Regular,
  CalendarClock24Filled,
  CalendarClock24Regular,
  CalendarMonth24Filled,
  CalendarMonth24Regular,
  CalendarPlay24Filled,
  CalendarPlay24Regular,
  CalendarSync24Filled,
  CalendarSync24Regular,
  CalendarToday24Filled,
  CalendarToday24Regular,
  CalendarWeekNumbers24Filled,
  CalendarWeekNumbers24Regular,
  CalendarWorkWeekFilled,
  CalendarWorkWeekRegular,
  CheckmarkCircle24Filled,
  CheckmarkCircle24Regular,
  CheckmarkFilled,
  CheckmarkRegular,
  Cloud24Filled,
  Cloud24Regular,
  CollectionsFilled,
  CollectionsRegular,
  ContentSettings24Filled,
  ContentSettings24Regular,
  ContentView24Filled,
  ContentView24Regular,
  Delete24Filled,
  Delete24Regular,
  DeleteDismiss24Filled,
  DeleteDismiss24Regular,
  Dismiss24Filled,
  Dismiss24Regular,
  DocumentDatabase24Filled,
  DocumentDatabase24Regular,
  DrinkMargarita24Filled,
  DrinkMargarita24Regular,
  Edit24Filled,
  Edit24Regular,
  EditSettings24Filled,
  EditSettings24Regular,
  Emoji24Filled,
  Emoji24Regular,
  Eye24Filled,
  Eye24Regular,
  FastForward24Filled,
  FastForward24Regular,
  Home24Filled,
  Home24Regular,
  HourglassHalfFilled,
  HourglassHalfRegular,
  Info24Filled,
  Info24Regular,
  Key24Filled,
  Key24Regular,
  KeyMultiple24Filled,
  KeyMultiple24Regular,
  Lightbulb24Filled,
  Lightbulb24Regular,
  LinkEdit24Filled,
  LinkEdit24Regular,
  ListBarFilled,
  ListBarRegular,
  NoteEdit24Filled,
  NoteEdit24Regular,
  PeopleAdd24Filled,
  PeopleAdd24Regular,
  PeopleEdit24Filled,
  PeopleEdit24Regular,
  PeopleTeam24Filled,
  PeopleTeam24Regular,
  Person24Filled,
  Person24Regular,
  PersonEdit24Filled,
  PersonEdit24Regular,
  PersonProhibited24Filled,
  PersonProhibited24Regular,
  PersonSync24Filled,
  PersonSync24Regular,
  SelectAllOff24Filled,
  SelectAllOff24Regular,
  SignOut24Filled,
  SignOut24Regular,
  StoreMicrosoft24Filled,
  StoreMicrosoft24Regular,
  System24Filled,
  System24Regular,
  TableCellEdit24Filled,
  TableCellEdit24Regular,
  TableEdit24Filled,
  TableEdit24Regular,
  TagMultiple24Filled,
  TagMultiple24Regular,
  TextBulletListSquareEdit24Filled,
  TextBulletListSquareEdit24Regular,
  Timeline24Filled,
  Timeline24Regular,
  Timer224Filled,
  Timer224Regular,
  TimerFilled,
  TimerRegular,
  Umbrella24Filled,
  Umbrella24Regular,
  WeatherSunnyLow24Filled,
  WeatherSunnyLow24Regular,
  WebAsset24Filled,
  WebAsset24Regular
} from '@fluentui/react-icons'
import React, { CSSProperties } from 'react'

/**
 * An object containing the available Fluent icons and their corresponding regular and filled versions.
 */
const iconCatalog = {
  TagQuestionMark: {
    regular: TagQuestionMarkRegular,
    filled: TagQuestionMarkFilled 
  },
  Lightbulb: {
    regular: Lightbulb24Regular,
    filled: Lightbulb24Filled
  },
  ListBar: {
    regular: ListBarRegular,
    filled: ListBarFilled
  },
  ContentSettings: {
    regular: ContentSettings24Regular,
    filled: ContentSettings24Filled
  },
  BuildingSkyscraper: {
    regular: BuildingSkyscraperRegular,
    filled: BuildingSkyscraperFilled
  },
  Home: {
    regular: Home24Regular,
    filled: Home24Filled
  },
  ContentView: {
    regular: ContentView24Regular,
    filled: ContentView24Filled
  },
  Eye: {
    regular: Eye24Regular,
    filled: Eye24Filled
  },
  NoteEdit: {
    regular: NoteEdit24Regular,
    filled: NoteEdit24Filled
  },
  LinkEdit: {
    regular: LinkEdit24Regular,
    filled: LinkEdit24Filled
  },
  Edit: {
    regular: Edit24Regular,
    filled: Edit24Filled
  },
  TableCellEdit: {
    regular: TableCellEdit24Regular,
    filled: TableCellEdit24Filled
  },
  PersonEdit: {
    regular: PersonEdit24Regular,
    filled: PersonEdit24Filled
  },
  TextBulletListSquareEdit: {
    regular: TextBulletListSquareEdit24Regular,
    filled: TextBulletListSquareEdit24Filled
  },
  Dismiss: {
    regular: Dismiss24Regular,
    filled: Dismiss24Filled
  },
  TagMultiple: {
    regular: TagMultiple24Regular,
    filled: TagMultiple24Filled
  },
  KeyMultiple: {
    regular: KeyMultiple24Regular,
    filled: KeyMultiple24Filled
  },
  Umbrella: {
    regular: Umbrella24Regular,
    filled: Umbrella24Filled
  },
  Person: {
    regular: Person24Regular,
    filled: Person24Filled
  },
  PersonProhibited: {
    regular: PersonProhibited24Regular,
    filled: PersonProhibited24Filled
  },
  SelectAllOff: {
    regular: SelectAllOff24Regular,
    filled: SelectAllOff24Filled
  },
  WeatherSunnyLow: {
    regular: WeatherSunnyLow24Regular,
    filled: WeatherSunnyLow24Filled
  },
  Cloud: {
    regular: Cloud24Regular,
    filled: Cloud24Filled
  },
  Timeline: {
    regular: Timeline24Regular,
    filled: Timeline24Filled
  },
  Collections: {
    regular: CollectionsRegular,
    filled: CollectionsFilled
  },
  Info: {
    regular: Info24Regular,
    filled: Info24Filled
  },
  CalendarPlay: {
    regular: CalendarPlay24Regular,
    filled: CalendarPlay24Filled
  },
  CalendarClock: {
    regular: CalendarClock24Regular,
    filled: CalendarClock24Filled
  },
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
    regular: CalendarWorkWeekRegular,
    filled: CalendarWorkWeekFilled
  },
  CheckmarkCircle: {
    regular: CheckmarkCircle24Regular,
    filled: CheckmarkCircle24Filled
  },
  Timer: {
    regular: TimerRegular,
    filled: TimerFilled
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
  },
  ArrowSync: {
    regular: ArrowSync24Regular,
    filled: ArrowSync24Filled
  },
  HourGlassHalf: {
    regular: HourglassHalfRegular,
    filled: HourglassHalfFilled
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
 * @param size - The size of the icon.
 *
 * @returns The specified Fluent icon.
 */
export function getFluentIcon(
  name: FluentIconName,
  bundle = true,
  color?: string,
  size?: number
) {
  if (!iconCatalog[name]) return null
  const icon = iconCatalog[name]
  const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
  const props: { style?: CSSProperties } = {}
  if (color) props.style = { color }
  if (size) {
    props.style = {
      ...props.style,
      width: size,
      height: size
    }
  }
  return <Icon {...props} />
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
 * @param bundleWithFilled - Whether to bundle the icon with the filled version. Defaults to true.
 * @param color - The color of the icon.
 *
 * @returns A Fluent UI icon component or a default icon component if the requested icon is not found.
 */
export function getFluentIconWithFallback(
  name: string,
  bundleWithFilled = true,
  color?: string
) {
  if (iconCatalog[name]) {
    return getFluentIcon(name as FluentIconName, bundleWithFilled, color)
  }
  return <Icon iconName={name} style={{ color }} />
}
