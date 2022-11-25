import { FilterPanel } from 'components/FilterPanel'
import React, { FC } from 'react'
import { useListFilterPanel } from './useListFilterPanel'

export const ListFilterPanel: FC = () => {
  const { filterPanelProps } = useListFilterPanel()
  return <FilterPanel {...filterPanelProps} />
}
