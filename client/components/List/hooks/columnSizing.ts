import { IListColumn } from '../types'

/**
 * Maximum reasonable column width in pixels. Any computed or
 * admin-configured width above this is clamped.
 */
export const MAX_COLUMN_WIDTH = 2000

/**
 * Default minimum column width when a column does not set `minWidth`.
 */
export const DEFAULT_MIN_WIDTH = 50

// Approximate average glyph width at Fluent's default 14px body font.
// Used only for a rough first-render estimate, not layout-critical.
const APPROX_CHAR_WIDTH_PX = 7.4

// Horizontal cell padding plus space reserved for the sort indicator.
const COLUMN_HEADER_PADDING_PX = 36

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Estimate a sensible initial width for `column` based on a sample of
 * `items`. Columns using custom rendering (`onRender` / `renderAs`) or
 * lacking `fieldName` cannot be measured from raw field values, so they
 * fall back to admin-configured widths.
 */
export function estimateColumnWidth<T extends object>(
  column: IListColumn<T>,
  items: readonly T[],
  sampleSize: number
): number {
  const minWidth = column.minWidth ?? DEFAULT_MIN_WIDTH
  const maxWidth = Math.min(column.maxWidth ?? MAX_COLUMN_WIDTH, MAX_COLUMN_WIDTH)

  if (column.onRender || column.renderAs || !column.fieldName) {
    const configured = column.idealWidth ?? column.defaultWidth ?? minWidth
    return clamp(configured, minWidth, maxWidth)
  }

  let maxChars = column.name?.length ?? 0
  const sampled = items.slice(0, sampleSize)
  for (const item of sampled) {
    const raw = (item as Record<string, unknown>)?.[column.fieldName]
    if (typeof raw === 'string' || typeof raw === 'number') {
      const length_ = String(raw).length
      if (length_ > maxChars) maxChars = length_
    }
  }
  const estimated = Math.ceil(maxChars * APPROX_CHAR_WIDTH_PX) + COLUMN_HEADER_PADDING_PX
  return clamp(estimated, minWidth, maxWidth)
}
