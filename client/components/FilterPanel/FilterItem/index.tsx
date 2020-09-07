import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import React, { useState, useMemo } from 'react'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './IFilterItemProps'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { contains, isBlank } from 'underscore.string'
import { useTranslation } from 'react-i18next'

/**
 * @category FilterPanel
 */
export const FilterItem = ({ filter, onFilterUpdated }: IFilterItemProps) => {
    const { t } = useTranslation('common')
    const selectedKeys = filter.selected.map(f => f.key)
    const [searchTerm, onSearch] = useState<string>('')

    const items = useMemo(() => {
        return filter.items.filter(item => isBlank(searchTerm) ? true : contains(item.value.toLowerCase(), searchTerm.toLowerCase()))
    }, [searchTerm])

    return (
        <div key={filter.key} className={styles.root}>
            <div className={styles.name}>{filter.name}</div>
            <div className={styles.searchBox} hidden={filter.items.length < 10}>
                <SearchBox
                    placeholder={t('searchPlaceholder')}
                    onChange={(_event, value) => onSearch(value)} />
            </div>
            {items.map(item => (
                <div key={item.key} className={styles.item}>
                    <Checkbox
                        label={item.value}
                        checked={selectedKeys.indexOf(item.key) !== -1}
                        onChange={(_, checked) => onFilterUpdated(filter, item, checked)} />
                </div>
            ))}
        </div >
    )
}
