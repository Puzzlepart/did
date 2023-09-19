import { BasePanel } from 'components/BasePanel'
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
  const { filtersToRender, onFilterUpdated, headerText, onClearFilters } =
    useFilterPanel(props)

  return (
    <BasePanel
      {...props}
      className={FilterPanel.className}
      headerText={headerText}
      headerClassName={styles.header}
      onDismiss={props.onDismiss}
      footerActions={[
        {
          text: t('common.clearFilters'),
          onClick: onClearFilters,
          disabled: !onClearFilters
        }
      ]}
    >
      {props.children}
      <div className={styles.actions} hidden={!!props.selectedFilter}>
        {props.actions}
      </div>
      {filtersToRender.map((filter) => (
        <FilterItem
          key={filter.key}
          filter={filter}
          onFilterUpdated={onFilterUpdated}
          shortListCount={props.shortListCount}
          hideHeader={!!props.selectedFilter}
        />
      ))}
    </BasePanel>
  )
}

FilterPanel.className = styles.filterPanel
FilterPanel.defaultProps = {
  shortListCount: 10
}

export * from './FilterItem'
export * from './Filters'
export * from './types'
