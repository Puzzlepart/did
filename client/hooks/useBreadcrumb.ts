import { IBreadcrumbItem } from 'components'
import { DependencyList, useMemo } from 'react'

/**
 * Returns a memoized array of breadcrumb items with keys added to each item.
 *
 * @param items An array of partial breadcrumb items.
 * @param deps An optional array of dependencies.
 *
 * @returns A memoized array of partial breadcrumb items with keys added to each item.
 */
export function useBreadcrumb(
  items: Partial<IBreadcrumbItem>[],
  deps: DependencyList = []
) {
  return useMemo<IBreadcrumbItem[]>(
    () =>
      items.map(
        (item, index) =>
          ({
            key: index,
            ...item
          }) as IBreadcrumbItem
      ),
    deps
  )
}
