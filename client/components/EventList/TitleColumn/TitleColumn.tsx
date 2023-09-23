import { Link } from '@fluentui/react-components'
import { EntityLabel } from 'components/EntityLabel'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './TitleColumn.module.scss'
import { ITitleColumnProps } from './types'
import { TimeColumn } from '../TimeColumn'

export const TitleColumn: StyledComponent<ITitleColumnProps> = (props) => {
    return (
        <div className={TitleColumn.className}>
            <Link href={props.event.webLink} target='_blank' title={props.event.title}>
                <span>{props.event.title}</span>
            </Link>
            {props.event.labels && (
                <div className={styles.labels}>
                    {props.event.labels.map((label, index) => (
                        <EntityLabel key={index} label={label} />
                    ))}
                </div>
            )}
            {props.displayTime && (
                <TimeColumn {...props} className={styles.time} />
            )}
        </div>
    )
}

TitleColumn.displayName = 'TitleColumn'
TitleColumn.className = styles.titleColumn