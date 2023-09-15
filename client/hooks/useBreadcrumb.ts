import { IBreadcrumbProps } from '@fluentui/react'
import { useMemo } from 'react'

/**
 * Returns a memoized `IBreadcrumbProps` object with the provided `items` array.
 *
 * @param items An array of `IBreadcrumbItem` objects to display in the breadcrumb.
 *
 * @returns A memoized `IBreadcrumbProps` object with the provided `items` array.
 */
export function useBreadcrumb(items: IBreadcrumbProps['items']) {
  return useMemo<IBreadcrumbProps>(
    () => ({
      styles: {
        root: { margin: 0 },
        itemLink: { fontSize: 14 },
        item: { fontSize: 14 },
        chevron: { fontSize: 8 }
      },
      items
    }),
    [items]
  )
}
