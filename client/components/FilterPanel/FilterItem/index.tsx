import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import React, { useState, useMemo } from 'react'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './types'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { contains, isBlank } from 'underscore.string'
import { useTranslation } from 'react-i18next'

/**
 * @category FilterPanel
 */
export const FilterItem = (props: IFilterItemProps) => {
    const { t } = useTranslation('common')
    const selectedKeys = props.filter.selected.map(f => f.key)
    const [searchTerm, onSearch] = useState<string>('')

    const items = useMemo(() => {
        return props.filter.items.filter(item => isBlank(searchTerm) ? true : contains(item.value.toLowerCase(), searchTerm.toLowerCase()))
    }, [searchTerm])

    return (
        <div className={styles.root}>
            <div className={styles.name}>{props.filter.name}</div>
            <div className={styles.searchBox} hidden={props.filter.items.length < 10}>
                <SearchBox
                    placeholder={t('searchPlaceholder')}
                    onChange={(_event, value) => onSearch(value)} />
            </div>
            {items.map(item => (
                <div key={item.key} className={styles.item}>
                    <Checkbox
                        label={item.value}
                        checked={selectedKeys.indexOf(item.key) !== -1}
                        onChange={(_, checked) => props.onFilterUpdated(props.filter, item, checked)} />
                </div>
            ))}
        </div >
    )
}
