/* eslint-disable tsdoc/syntax */
import { EntityLabel } from 'components/EntityLabel'
import { Icon, Label } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LabelPicker.module.scss'
import { SelectCallout } from './SelectCallout'
import { ILabelPickerProps } from './types'
import { useLabelPicker } from './useLabelPicker'

/**
 * @category Function Component
 */
export const LabelPicker: FunctionComponent<ILabelPickerProps> = (
  props: ILabelPickerProps
) => {
  const { t } = useTranslation()
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
          ref={ref}>
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
        target={ref.current}
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
