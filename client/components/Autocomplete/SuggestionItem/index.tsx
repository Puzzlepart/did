import React from 'react'
import styles from './SuggestionItem.module.scss'
import { ISuggestionItemProps } from './types'

export function SuggestionItem<T = any>({ item }: ISuggestionItemProps) {
    if (item.key === -1) {
        return (
            <div key={item.key} data-is-focusable={true}>
                {item.displayValue}
            </div>
        )
    }

    const classNames = [styles.root, item.isSelected && styles.isSelected]
    
    return (
        <div className={classNames.join(' ')} data-is-focusable={true}>
            <div>
                {/* <div className={this.props.classNames.suggestionIcon} hidden={!this.props.showIcons}>
                    <Icon iconName={item.iconName} />
                </div> */}
                <div className={styles.suggestionValue}>{item.displayValue}</div>
            </div>
        </div>
    )
}