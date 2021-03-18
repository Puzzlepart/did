/* eslint-disable tsdoc/syntax */
import { Panel } from 'office-ui-fabric-react'
import React from 'react'
import { FilterItem } from './FilterItem'
import styles from './FilterPanel.module.scss'
import { IFilterPanelProps } from './types'
import { useFilterPanel } from './useFilterPanel'

/**
 * @category Function Component
 */
export const FilterPanel = (props: IFilterPanelProps) => {
  const { filters, onFilterUpdated } = useFilterPanel({ props })

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
