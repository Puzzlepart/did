import { Label } from 'office-ui-fabric-react/lib/Label'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Callout } from 'office-ui-fabric-react/lib/Callout'
import React, { useRef, useState, useEffect } from 'react'
import { EntityLabel } from 'components/EntityLabel'
import styles from './LabelPicker.module.scss'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { useQuery } from '@apollo/react-hooks'
import { GET_LABELS } from './types'
import { IEntityLabel } from 'interfaces'

/**
 * @category LabelPicker
 */
export const LabelPicker = () => {
    const { data } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' })
    const toggle = useRef()

    const [labels, setLabels] = useState<IEntityLabel[]>([])

    useEffect(() => setLabels(data ? data.labels : []), [data])

    return (
        <div className={styles.root}>
            <Label className={styles.label}>
                <span>Merkelapper</span>
                <span className={styles.toggleIcon} ref={toggle}>
                    <Icon iconName='Settings' />
                </span>
            </Label>
            <EntityLabel label={{ name: 'crayon-timereg', description: '', color: '#a6c0f4' }} />
            <EntityLabel label={{ name: 'includes-travel', description: '', color: '#a6c0f5' }} />
            <Callout
                className={styles.calloutSelector}
                target={toggle.current}>
                <SearchBox
                    className={styles.searchBox}
                    labelText={'Filter labels...'} />
                <ul>
                    {labels.map(lbl => (
                        <li key={lbl.id}>
                            <div className={styles.itemContainer}>
                                <Checkbox className={styles.itemCheckbox} />
                                <div>
                                    <div>
                                        <Icon iconName='CircleFill' style={{ color: lbl.color, fontSize: 10 }} />
                                        <span style={{ paddingLeft: 5 }}>{lbl.name}</span>
                                    </div>
                                    <div>{lbl.description}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Callout>
        </div>
    )
}