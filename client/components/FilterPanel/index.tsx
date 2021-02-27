import { Panel } from 'office-ui-fabric'
import React, { useEffect, useState } from 'react'
import { FilterItem } from './FilterItem'
import { IFilter, IFilterItem } from './Filters'
import { IFilterPanelProps } from './types'
import styles from './FilterPanel.module.scss'

export const FilterPanel = (props: IFilterPanelProps) => {
  const [filters, setFilters] = useState<IFilter[]>(
    props.filters.map((f) => f.initialize(props.items))
  )
  useEffect(
    () => setFilters(props.filters.map((f) => f.initialize(props.items))),
    [props.items, props.filters]
  )

  /**
   * On filter updated
   *
   * @param filter - Filter
   * @param item - Item
   * @param checked - Checked
   */
  const onFilterUpdated = (
    filter: IFilter,
    item: IFilterItem,
    checked: boolean
  ) => {
    if (checked) filter.selected.push(item)
    else filter.selected = filter.selected.filter((f) => f.key !== item.key)
    const updatedFilters = filters.map((f) => {
      if (f.key === filter.key) {
        return filter
      }
      return f
    })
    setFilters(updatedFilters)
    props.onFiltersUpdated(
      updatedFilters.filter((filter) => filter.selected.length > 0)
    )
  }

  return (
    <Panel
      isOpen={props.isOpen}
      className={styles.root}
      headerText={props.headerText}
      headerClassName={styles.header}
      isLightDismiss={true}
      onDismiss={props.onDismiss}>
      {props.children}
      {filters
        .filter((filter) => filter.items.length > 1)
        .map((filter) => (
          <FilterItem
            key={filter.key}
            filter={filter}
            onFilterUpdated={onFilterUpdated}
            shortListCount={props.shortListCount}
          />
        ))}
    </Panel>
  )
}

export * from './FilterItem'
export * from './Filters'
export * from './types'
