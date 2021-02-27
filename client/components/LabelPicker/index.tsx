import { EntityLabel } from 'components/EntityLabel'
import { Icon, Label } from 'office-ui-fabric'
import React, { FunctionComponent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LabelPicker.module.scss'
import { SelectCallout } from './SelectCallout'
import { ILabelPickerProps } from './types'
import { useLabelPicker } from './useLabelPicker'

export const LabelPicker: FunctionComponent<ILabelPickerProps> = (props: ILabelPickerProps) => {
  const { t } = useTranslation()
  const { labels, selectedLabels, showCallout, setShowCallout, onToggleLabel } = useLabelPicker(
    props
  )
  const toggleRef = useRef()

  return (
    <div className={`${styles.root} ${props.className}`}>
      <Label className={styles.inputLabel}>
        <span>{props.label}</span>
        <span
          className={styles.toggleIcon}
          onClick={() => setShowCallout(!showCallout)}
          ref={toggleRef}>
          <Icon iconName='Settings' />
        </span>
      </Label>
      <div className={styles.selectedLabels}>
        {selectedLabels.map((lbl) => (
          <EntityLabel key={lbl.name} label={lbl} />
        ))}
      </div>
      <span className={styles.noneSelected} hidden={selectedLabels.length > 0}>
        {t('common.noneSelectedMessage')}
      </span>
      <SelectCallout
        target={toggleRef}
        hidden={!showCallout}
        labels={labels}
        placeholder={props.placeholder}
        onToggleLabel={onToggleLabel}
        defaultSelectedKeys={props.defaultSelectedKeys}
        onDismiss={() => setShowCallout(false)}
      />
    </div>
  )
}
