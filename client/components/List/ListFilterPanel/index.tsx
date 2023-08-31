import { FilterPanel } from 'components/FilterPanel'
import React, { FC } from 'react'
import { useListFilterPanel } from './useListFilterPanel'

/**
 * A component that renders a filter panel for a list.
 *
 * @returns A React functional component.
 */
export const ListFilterPanel: FC = () => {
  const filterPanelProps = useListFilterPanel()
  return <FilterPanel {...filterPanelProps} />
}
