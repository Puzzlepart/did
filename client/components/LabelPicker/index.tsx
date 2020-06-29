import { Label } from 'office-ui-fabric-react/lib/Label'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useRef, useState, useEffect } from 'react'
import { EntityLabel } from 'components/EntityLabel'
import styles from './LabelPicker.module.scss'
import { useQuery } from '@apollo/react-hooks'
import { GET_LABELS, ILabelPickerProps } from './types'
import { IEntityLabel } from 'interfaces'
import { SelectCallout } from './SelectCallout'
import { omit } from 'underscore'

/**
 * @category LabelPicker
 */
export const LabelPicker = (props: ILabelPickerProps) => {
    const { data } = useQuery(GET_LABELS, { fetchPolicy: 'cache-and-network' })
    const toggleRef = useRef()
    const [labels, setLabels] = useState<IEntityLabel[]>([])
    const [selectedLabels, setSelectedLabels] = useState<IEntityLabel[]>([])
    const [showCallout, setShowCallout] = useState<boolean>(false)

    function onToggleLabel(label: IEntityLabel, checked: boolean) {
        let _selectedLabels = [...selectedLabels]
        if (checked) {
            _selectedLabels.push(omit(label, '__typename'))
            setSelectedLabels(_selectedLabels)
        } else {
            _selectedLabels.splice(_selectedLabels.indexOf(label), 1)
            setSelectedLabels(_selectedLabels)
        }
        props.onChange(_selectedLabels)
    }

    useEffect(() => setLabels(data ? data.labels : []), [data])

    return (
        <div className={styles.root}>
            <Label className={styles.label}>
                <span>{props.label}</span>
                <span
                    className={styles.toggleIcon}
                    onClick={_ => setShowCallout(!showCallout)}
                    ref={toggleRef}>
                    <Icon iconName='Settings' />
                </span>
            </Label>
            {selectedLabels.map(label => <EntityLabel key={label.id} label={label} />)}
            <SelectCallout
                target={toggleRef}
                hidden={!showCallout}
                labels={labels}
                onToggleLabel={onToggleLabel}
                onDismiss={() => setShowCallout(false)} />
        </div>
    )
}