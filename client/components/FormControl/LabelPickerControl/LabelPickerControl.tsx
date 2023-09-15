import { Icon } from '@fluentui/react'
import { Label } from '@fluentui/react-components'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import styles from './LabelPickerControl.module.scss'
import { SelectCallout } from './SelectCallout'
import { ILabelPickerControlProps } from './types'
import { useLabelPicker } from './useLabelPicker'
import { FormInputControlComponent } from '../types'

/**
 * @category Reusable Component
 */
export const LabelPickerControl: FormInputControlComponent<ILabelPickerControlProps> = (props) => {
  const {
    labels,
    selectedLabels,
    showCallout,
    setShowCallout,
    onToggleLabel,
    ref
  } = useLabelPicker(props)

  return (
    <div className={`${LabelPickerControl.className} ${props.className}`}>
      <Label weight='semibold' className={styles.inputLabel}>
        <span>{props.label}</span>
        <span
          className={styles.toggleIcon}
          onClick={() => setShowCallout(!showCallout)}
          ref={ref}
        >
          <Icon iconName='Settings' />
        </span>
      </Label>
      <div className={styles.selectedLabels}>
        {selectedLabels.map((lbl) => (
          <EntityLabel key={lbl.name} label={lbl} />
        ))}
      </div>
      <UserMessage
        hidden={selectedLabels.length > 0}
        text={props.noSelectionText}
      />
      <SelectCallout
        target={ref.current}
        hidden={!showCallout}
        labels={labels}
        selectedLabels={selectedLabels}
        placeholder={props.placeholder}
        headerText={props.headerText}
        onToggleLabel={onToggleLabel}
        onDismiss={() => setShowCallout(false)}
      />
    </div>
  )
}

LabelPickerControl.displayName = 'LabelPickerControl'
LabelPickerControl.className = styles.labelPickerControl
LabelPickerControl.defaultProps = {
  defaultSelectedKeys: []
}
