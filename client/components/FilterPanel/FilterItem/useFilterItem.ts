/* eslint-disable unicorn/consistent-function-scoping */
import { CheckboxProps } from '@fluentui/react-components'
import { useMemo, useState } from 'react'
import s from 'underscore.string'
import { useFilterPanelContext } from '../context'
import { IFilterItemProps } from './types'

/**
 * Hook that provides functionality for a filter item.
 *
 * @param props - The props for the filter item.
 */
export function useFilterItem({ filter }: IFilterItemProps) {
  const context = useFilterPanelContext()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showCount, setShowCount] = useState(context.props.shortListCount)

  const items = useMemo(() => {
    return filter.items
      .filter((item) => Boolean(item.key))
      .filter((item) =>
        s.isBlank(searchTerm)
          ? true
          : s.contains(item.value.toLowerCase(), searchTerm.toLowerCase())
      )
  }, [searchTerm, filter.items])

  /**
   * Handles the change event of the checkbox input element.
   * @param event - The change event object.
   */
  const onChange: CheckboxProps['onChange'] = ({ target }) => {
    const newSelected = new Set(context.selected.get(filter.key) ?? [])
    if (newSelected.has(target.name)) newSelected.delete(target.name)
    else newSelected.add(target.name)
    context.onFilterUpdated(filter, newSelected)
  }

  return {
    onSearch: setSearchTerm,
    items,
    showCount,
    setShowCount,
    onChange,
    selected: context.selected.get(filter.key) ?? new Set()
  }
}
