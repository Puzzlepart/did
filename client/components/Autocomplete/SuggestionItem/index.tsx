import { Icon } from 'office-ui-fabric'
import React from 'react'
import { omit } from 'underscore'
import styles from './SuggestionItem.module.scss'
import { ISuggestionItemProps } from './types'

export function SuggestionItem(props: ISuggestionItemProps) {
    if (props.item.key === -1) {
        return (
            <div data-is-focusable={true}>
                {props.item.text}
            </div>
        )
    }

    const classNames = [styles.root, props.item.isSelected && styles.isSelected] 

    return (
        <div
            {...omit(props, 'itemIcons', 'item')}
            className={classNames.join(' ')}
            data-is-focusable={true}>
            <div className={styles.container}>
                <div
                    className={styles.icon}
                    style={props.itemIcons?.style}
                    hidden={!props.itemIcons}>
                    <Icon iconName={props.item.iconName} />
                </div>
                <div className={styles.content}>
                    <div className={styles.text}>{props.item.text}</div>
                    <div className={styles.secondaryText}>{props.item.secondaryText}</div>
                </div>
            </div>
        </div>
    )
}