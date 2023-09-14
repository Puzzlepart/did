import { Checkbox } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './types'
import { useFilterItem } from './useFilterItem'

/**
 * @category Function Component
 */
export const FilterItem: StyledComponent<IFilterItemProps> = (props) => {
  const { t } = useTranslation()
  const { onSearch, items, showCount, setShowCount, selectedKeys } =
    useFilterItem(props)
  return (
    <div className={FilterItem.className}>
      <div className={styles.header} hidden={props.hideHeader}>
        <span>{props.filter.name}</span>
      </div>
      <div
        className={styles.searchBox}
        hidden={props.filter.items.length < props.shortListCount}
      >
        <SearchBox
          placeholder={t('common.searchPlaceholder')}
          onChange={(_event, { value }) => onSearch(value)}
        />
      </div>
      {[...items].slice(0, showCount).map((item) => (
        <div key={item.key} className={styles.item}>
          <Checkbox
            label={item.value}
            checked={selectedKeys.has(item.key as string)}
            onChange={(_, { checked }) =>
              props.onFilterUpdated(props.filter, item, checked as boolean)
            }
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

FilterItem.className = styles.filterItem
