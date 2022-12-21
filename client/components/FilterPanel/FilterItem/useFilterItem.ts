import { useMemo, useState } from 'react'
import s from 'underscore.string'
import { IFilterItemProps } from './types'

export function useFilterItem(props: IFilterItemProps) {
  const selectedKeys = new Set(props.filter.selected.map((f) => f.key))
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showCount, setShowCount] = useState(props.shortListCount)

  const items = useMemo(() => {
    return props.filter.items.filter((item) =>
      s.isBlank(searchTerm)
        ? true
        : s.contains(item.value.toLowerCase(), searchTerm.toLowerCase())
    )
  }, [searchTerm, props.filter.items])
  return {
    onSearch: setSearchTerm,
    items,
    showCount,
    setShowCount,
    selectedKeys
  } as const
}
