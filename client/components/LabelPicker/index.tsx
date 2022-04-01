/* eslint-disable tsdoc/syntax */
import { Icon, Label } from '@fluentui/react'
import { EntityLabel } from 'components/EntityLabel'
import { ReusableComponent } from 'components/types'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LabelPicker.module.scss'
import { SelectCallout } from './SelectCallout'
import { ILabelPickerProps } from './types'
import { useLabelPicker } from './useLabelPicker'

/**
 * @category Reusable Component
 */
export const LabelPicker: ReusableComponent<ILabelPickerProps> = (props) => {
  const {
    labels,
    selectedLabels,
    showCallout,
    setShowCallout,
    onToggleLabel,
    ref
  } = useLabelPicker(props)

  return (
    <div className={`${styles.root} ${props.className}`}>
      <Label className={styles.inputLabel}>
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

LabelPicker.defaultProps = {
  defaultSelectedKeys: []
}
