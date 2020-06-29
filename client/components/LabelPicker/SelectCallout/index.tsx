import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Callout } from 'office-ui-fabric-react/lib/Callout'
import React, {  } from 'react'
import styles from './SelectCallout.module.scss'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'

/**
 * @category SelectCallout
 */
export const SelectCallout = ({ labels, hidden, onDismiss, target, onToggleLabel }) => {
    return (
        <Callout
            hidden={hidden}
            className={styles.root}
            isBeakVisible={false}
            gapSpace={10}
            onDismiss={onDismiss}
            target={target}>
            <SearchBox
                className={styles.searchBox}
                labelText={'Filter labels...'} />
            <ul>
                {labels.map(lbl => (
                    <li key={lbl.id}>
                        <div className={styles.itemContainer}>
                            <Checkbox
                                className={styles.itemCheckbox}
                                onChange={(_ev, checked) => onToggleLabel(lbl, checked)} />
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