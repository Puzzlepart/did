import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Callout, ICalloutProps } from 'office-ui-fabric-react/lib/Callout'
import React, { useState, useEffect } from 'react'
import styles from './SelectCallout.module.scss'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { IEntityLabel } from 'interfaces'

export interface ISelectCalloutProps extends ICalloutProps {
    labels: IEntityLabel[]
    searchLabelText: string
    onToggleLabel: (label: IEntityLabel) => void
}

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
                lbl.name.toLowerCase().indexOf(value.toLowerCase()) != -1
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