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
import { SelectCallout } from './SelectCallout'

/**
 * @category LabelPicker
 */
export const LabelPicker = () => {
    const { data } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' })
    const toggleRef = useRef()

    const [labels, setLabels] = useState<IEntityLabel[]>([])
    const [selectedLabels, setSelectedLabels] = useState<IEntityLabel[]>([])
    const [showCallout, setShowCallout] = useState<boolean>(false)

    function onToggleLabel(label: IEntityLabel, checked: boolean) {
        if (checked) setSelectedLabels([...selectedLabels, label])
        else {
            let _selectedLabels = [...selectedLabels]
            _selectedLabels.splice(_selectedLabels.indexOf(label), 1)
            setSelectedLabels(_selectedLabels)
        }
    }

    useEffect(() => setLabels(data ? data.labels : []), [data])

    return (
        <div className={styles.root}>
            <Label className={styles.label}>
                <span>Merkelapper</span>
                <span
                    className={styles.toggleIcon}
                    onClick={_ => setShowCallout(!showCallout)}
                    ref={toggleRef}>
                    <Icon iconName='Settings' />
                </span>
            </Label>
            {selectedLabels.map(label => (
                <EntityLabel key={label.id} label={label} />
            ))}
            <SelectCallout
                target={toggleRef}
                hidden={!showCallout}
                labels={labels}
                onToggleLabel={onToggleLabel}
                onDismiss={() => setShowCallout(false)} />
        </div>
    )
}