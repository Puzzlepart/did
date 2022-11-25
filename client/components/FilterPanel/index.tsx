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
  const { filters, onFilterUpdated, headerText } = useFilterPanel(props)

  return (
    <Panel
      isOpen={props.isOpen}
      className={styles.root}
      headerText={headerText}
      headerClassName={styles.header}
      isLightDismiss={true}
      onDismiss={props.onDismiss}
    >
      {props.children}
      <div className={styles.actions} hidden={!!props.selectedFilter}>
        {props.actions}
        <ActionButton
          iconProps={{ iconName: 'ClearFilter' }}
          text={t('common.clearFilters')}
          onClick={props.onClearFilters}
          disabled={!props.onClearFilters}
        />
      </div>
      {filters
        .filter((filter) =>
          props.selectedFilter ? props.selectedFilter?.key === filter.key : true
        )
        .filter((filter) => filter.items.length > 1)
        .map<JSX.Element>((filter) => (
          <FilterItem
            key={filter.key}
            filter={filter}
            onFilterUpdated={onFilterUpdated}
            shortListCount={props.shortListCount}
            hideHeader={!!props.selectedFilter}
          />
        ))}
    </Panel>
  )
}

FilterPanel.defaultProps = {
  shortListCount: 10
}

export * from './FilterItem'
export * from './Filters'
export * from './types'
