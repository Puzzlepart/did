import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Callout } from 'office-ui-fabric-react/lib/Callout'
import React, { useState, useEffect } from 'react'
import styles from './SelectCallout.module.scss'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { IEntityLabel } from 'interfaces'
import { ISelectCalloutProps } from './types'

/**
 * @category SelectCallout
 */
export const SelectCallout = (props: ISelectCalloutProps) => {
    const [labels, setLabels] = useState<IEntityLabel[]>(props.labels)

    useEffect(() => setLabels(props.labels), [props.labels])

    function onSearch(value: string) {
        let _labels = [...props.labels]
        if (value.length > 0) {
            _labels = _labels.filter(lbl =>
                lbl.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )
        }
        setLabels(_labels)
    }

    return (
        <Callout
            hidden={props.hidden}
            className={styles.root}
            isBeakVisible={false}
            gapSpace={10}
            onDismiss={props.onDismiss}
            target={props.target}>
            <SearchBox
                className={styles.searchBox}
                labelText={props.searchLabelText}
                onChange={(_evt, value) => onSearch(value)} />
            <ul>
                {labels.map(lbl => (
                    <li key={lbl.id}>
                        <div className={styles.itemContainer}>
                            <Checkbox
                                defaultChecked={props.defaultSelectedKeys.indexOf(lbl.id) !== -1}
                                className={styles.itemCheckbox}
                                onChange={() => props.onToggleLabel(lbl)} />
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
    )
}