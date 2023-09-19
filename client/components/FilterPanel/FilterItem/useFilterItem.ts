import { useMemo, useState } from 'react'
import s from 'underscore.string'
import { IFilterItemProps } from './types'

/**
 * Hook that provides functionality for a filter item.
 *
 * @param props - The props for the filter item.
 */
export function useFilterItem({ filter, shortListCount }: IFilterItemProps) {
  const selectedKeys = useMemo(
    () => new Set(filter.selected.map((f) => f.key)),
    [filter.selected]
  ) as Set<string>
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showCount, setShowCount] = useState(shortListCount)

  const items = useMemo(() => {
    return filter.items.filter((item) =>
      s.isBlank(searchTerm)
        ? true
        : s.contains(item.value.toLowerCase(), searchTerm.toLowerCase())
    )
  }, [searchTerm, filter.items])

  return {
    onSearch: setSearchTerm,
    items,
    showCount,
    setShowCount,
    selectedKeys
  } as const
}
