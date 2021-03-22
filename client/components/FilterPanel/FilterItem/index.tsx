/* eslint-disable tsdoc/syntax */
import { Checkbox, SearchBox } from 'office-ui-fabric-react'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contains, isBlank } from 'underscore.string'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './types'

/**
 * @category Function Component
 */
export const FilterItem: React.FC<IFilterItemProps> = (props) => {
  const { t } = useTranslation()
  const selectedKeys = new Set(props.filter.selected.map((f) => f.key))
  const [searchTerm, onSearch] = useState<string>('')
  const [showCount, setShowCount] = useState(props.shortListCount || 10)

  const items = useMemo(() => {
    return props.filter.items.filter((item) =>
      isBlank(searchTerm)
        ? true
        : contains(item.value.toLowerCase(), searchTerm.toLowerCase())
    )
  }, [searchTerm, props.filter.items])

  return (
    <div className={styles.root}>
      <div className={styles.name}>{props.filter.name}</div>
      <div className={styles.searchBox} hidden={props.filter.items.length < 10}>
        <SearchBox
          placeholder={t('common.searchPlaceholder')}
          onChange={(_event, value) => onSearch(value)}
        />
      </div>
      {[...items].slice(0, showCount).map((item) => (
        <div key={item.key} className={styles.item}>
          <Checkbox
            label={item.value}
            checked={selectedKeys.has(item.key)}
            onChange={(_, checked) =>
              props.onFilterUpdated(props.filter, item, checked)
            }
          />
        </div>
      ))}
      <div
        className={styles.showAllLink}
        hidden={items.length < 10 || showCount === props.filter.items.length}
        onClick={() => setShowCount(props.filter.items.length)}>
        {t('common.showAllFiltersText', { count: props.filter.items.length })}
      </div>
    </div>
  )
}
