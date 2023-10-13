import { Checkbox } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './types'
import { useFilterItem } from './useFilterItem'
import { useFilterPanelContext } from '../context'

export const FilterItem: StyledComponent<IFilterItemProps> = (props) => {
  const { t } = useTranslation()
  const context = useFilterPanelContext()
  const { onSearch, items, showCount, setShowCount, onChange, selected } =
    useFilterItem(props)
  return (
    <div className={FilterItem.className}>
      <div className={styles.header} hidden={!!context.props.selectedFilter}>
        <span>{props.filter.name}</span>
      </div>
      <div
        className={styles.searchBox}
        hidden={props.filter.items.length < context.props.shortListCount}
      >
        <SearchBox
          placeholder={t('common.searchPlaceholder')}
          onChange={(_event, { value }) => onSearch(value)}
        />
      </div>
      {[...items].slice(0, showCount).map((item) => (
        <div key={item.key} className={styles.item}>
          <Checkbox
            name={item.key as string}
            label={item.value}
            checked={selected.has(item.key as string)}
            onChange={onChange}
          />
        </div>
      ))}
      <div
        className={styles.showAllLink}
        hidden={items.length < 10 || showCount === props.filter.items.length}
        onClick={() => setShowCount(props.filter.items.length)}
      >
        {t('common.showAllFiltersText', { count: props.filter.items.length })}
      </div>
    </div>
  )
}

FilterItem.displayName = 'FilterItem'
FilterItem.className = styles.filterItem
