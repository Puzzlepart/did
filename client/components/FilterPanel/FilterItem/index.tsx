import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import * as React from 'react'
import styles from './FilterItem.module.scss'
import { IFilterItemProps } from './IFilterItemProps'

/**
 * @category FilterPanel
 */
export const FilterItem = ({ filter, onFilterUpdated: filterUpdated }: IFilterItemProps) => {
    const selectedKeys = filter.selected.map(f => f.key)
    return (
        <div key={filter.key} className={styles.root}>
            <div className={styles.name}>{filter.name}</div>
            {filter.items.map(item => (
                <div key={item.key} className={styles.item}>
                    <Checkbox
                        label={item.value}
                        checked={selectedKeys.indexOf(item.key) !== -1}
                        onChange={(_, checked) => filterUpdated(filter, item, checked)} />
                </div>
            ))
            }
        </div >
    )
}
