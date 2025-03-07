import React, { FC } from 'react'
import { IViewColumnProps } from './types'
import styles from './ViewColumn.module.scss'
import { mergeClasses, Checkbox, Caption2,Label } from '@fluentui/react-components'
import { getFluentIcon } from 'utils'
import { useTranslation } from 'react-i18next'

export const ViewColumn: FC<IViewColumnProps> = (props) => {
    const {t} = useTranslation()
    return (
        <div
            ref={props.provided.innerRef}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            className={mergeClasses(
                styles.viewColumn,
                props.snapshot.isDragging ? styles.dragging : ''
            )}
        >
            <div className={styles.top}>
                <Checkbox
                    disabled={props.column.data?.required}
                    checked={!props.column.data?.hidden}
                    onChange={() => props.onToggle(props.column.key)}
                />
                <Label className={styles.label}>{props.column.label ?? props.column.name}</Label>
                <div
                    className={styles.moveUp}
                    onClick={() => props.onReorder(props.index, props.index - 1)}
                    title={t('list.viewColumnsPanel.moveUp')}
                >
                    {getFluentIcon('ChevronUp', { size: 24 })}
                </div>
                <div
                    className={styles.moveDown}
                    onClick={() => props.onReorder(props.index, props.index + 1)}
                    title={t('list.viewColumnsPanel.moveDown')}
                >
                    {getFluentIcon('ChevronDown', { size: 24 })}
                </div>
            </div>
            <div hidden={!props.column.description} className={styles.description}>
                <Caption2>{props.column.description}</Caption2>
            </div>
        </div>
    )
}