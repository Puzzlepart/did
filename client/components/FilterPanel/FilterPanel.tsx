import { Panel, PanelComponent } from 'components/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FilterItem } from './FilterItem'
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
export const FilterPanel: PanelComponent<IFilterPanelProps> = (props) => {
  const { t } = useTranslation()
  const { filtersToRender, onFilterUpdated, title, onClearFilters } =
    useFilterPanel(props)

  return (
    <Panel
      {...props}
      title={title}
      onDismiss={props.onDismiss}
      actions={[
        {
          text: t('common.clearFilters'),
          onClick: onClearFilters,
          disabled: !onClearFilters,
          appearance: 'secondary'
        }
      ]}
    >
      {props.children}
      {filtersToRender.map((filter) => (
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

FilterPanel.displayName = 'FilterPanel'
FilterPanel.defaultProps = {
  shortListCount: 10
}
