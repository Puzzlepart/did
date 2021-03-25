/* eslint-disable tsdoc/syntax */
import { Panel } from '@fluentui/react-react'
import React from 'react'
import { FilterItem } from './FilterItem'
import styles from './FilterPanel.module.scss'
import { IFilterPanelProps } from './types'
import { useFilterPanel } from './useFilterPanel'

/**
 * Filter panel that renders filter items with more than
 * 1 item.
 *
 * `shortListCount` defaults to **10**, meaning
 * 10 items are shown before displaying a show more link.
 *
 * @category Function Component
 */
export const FilterPanel: React.FC<IFilterPanelProps> = (props) => {
  const { filters, onFilterUpdated } = useFilterPanel(props)

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
