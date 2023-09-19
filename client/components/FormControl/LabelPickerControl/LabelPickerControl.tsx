import { Popover, PopoverSurface } from '@fluentui/react-components'
import { DynamicButton } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Field } from '../Field'
import { FormInputControlComponent } from '../types'
import { LabelPicker } from './LabelPicker'
import styles from './LabelPickerControl.module.scss'
import { ILabelPickerControlProps } from './types'
import { useLabelPicker } from './useLabelPicker'

/**
 * @category Reusable Component
 */
export const LabelPickerControl: FormInputControlComponent<ILabelPickerControlProps> =
  (props) => {
    const { t } = useTranslation()
    const { labels, selectedLabels, onToggleLabel } = useLabelPicker(props)

    return (
      <Field
        className={`${LabelPickerControl.className} ${props.className}`}
        {...props}
      >
        <div className={styles.selectedLabels}>
          {selectedLabels.map((lbl) => (
            <EntityLabel key={lbl.name} label={lbl} />
          ))}
        </div>
        <UserMessage
          hidden={selectedLabels.length > 0}
          text={props.noSelectionText}
        />
        <Popover trapFocus={true} closeOnScroll withArrow>
          <DynamicButton
            text={t('admin.labels.editLabels')}
            iconName='TagMultiple'
            className={styles.openPickerButton}
            subtle
            triggerFor='Popover'
          />
          <PopoverSurface>
            <LabelPicker
              labels={labels}
              selectedLabels={selectedLabels}
              placeholder={props.placeholder}
              onToggleLabel={onToggleLabel}
            />
          </PopoverSurface>
        </Popover>
      </Field>
    )
  }

LabelPickerControl.displayName = 'LabelPickerControl'
LabelPickerControl.className = styles.labelPickerControl
LabelPickerControl.defaultProps = {
  defaultSelectedKeys: []
}
