/* eslint-disable tsdoc/syntax */
import { ActionButton, Panel } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
 * @category Reusable Component
 */
export const FilterPanel: ReusableComponent<IFilterPanelProps> = (props) => {
  const { t } = useTranslation()
  const { filters, onFilterUpdated } = useFilterPanel(props)

  return (
    <Panel
      isOpen={props.isOpen}
      className={styles.root}
      headerText={props.headerText}
      headerClassName={styles.header}
      isLightDismiss={true}
      onDismiss={props.onDismiss}
    >
      {props.children}
      {props.onClearFilters && (
        <ActionButton
          styles={{ root: { marginTop: 15 } }}
          iconProps={{ iconName: 'ClearFilter' }}
          text={t('common.clearFilters')}
          onClick={props.onClearFilters}
        />
      )}
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
