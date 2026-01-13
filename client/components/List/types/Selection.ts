/**
 * Selection mode for list components.
 *
 * IMPORTANT: This is the Fluent UI v9 compatible SelectionMode.
 * DO NOT import SelectionMode from '@fluentui/react' or '@fluentui/react-calendar-compat'
 * as those use numeric enum values (0, 1, 2) which are incompatible with this implementation
 * that uses string values ('none', 'single', 'multiple').
 *
 * Always import from 'components/List/types' or './types' to ensure compatibility.
 *
 * @example
 * ```tsx
 * // Correct:
 * import { SelectionMode } from 'components/List/types'
 *
 * // Wrong:
 * import { SelectionMode } from '@fluentui/react' // DO NOT USE
 * ```
 */
export enum SelectionMode {
  none = 'none',
  single = 'single',
  multiple = 'multiple'
}

/**
 * Checkbox visibility hint for list selection.
 *
 * Controls when selection checkboxes are displayed in the list.
 */
export enum CheckboxVisibility {
  /** Never show checkboxes */
  hidden = 'hidden',
  /** Show checkboxes on row hover (default) */
  onHover = 'onHover',
  /** Always show checkboxes */
  always = 'always'
}
