import { createContext, useContext } from 'react'
import { IFilter } from './Filters/types'
import { IFilterPanelProps } from './types'

export interface IFilterPanelContext {
  /**
   * On filter updated callback.
   */
  onFilterUpdated: (filter: IFilter, selected: Set<string>) => void

  /**
   * Selected state.
   */
  selected: Map<string, Set<string>>

  /**
   * Set selected state.
   */
  setSelected: (value: React.SetStateAction<Map<string, Set<string>>>) => void

  /**
   * Props for the `FilterPanel` component.
   */
  props: IFilterPanelProps
}

export const FilterPanelContext = createContext<IFilterPanelContext>(null)

export const useFilterPanelContext = () => useContext(FilterPanelContext)
