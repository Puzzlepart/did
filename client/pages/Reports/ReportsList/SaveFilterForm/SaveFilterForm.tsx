import { Input } from '@fluentui/react-components'
import { DynamicButton, Field, IconPickerControl } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import s from 'underscore.string'
import styles from './SaveFilterForm.module.scss'
import { useSaveFilterForm } from './useSaveFilterForm'

/**
 * @category Reports
 */
export const SaveFilterForm: StyledComponent = () => {
  const { t } = useTranslation()
  const { inputVisible, value, set, onSave, disabled } = useSaveFilterForm()

  return (
    <div className={SaveFilterForm.className}>
      {inputVisible.value && (
        <div className={styles.body}>
          <Field className={styles.nameInput}>
            <Input
              value={value('text')}
              placeholder={t('reports.filterNamePlaceholder')}
              onChange={(_event, { value }) => {
                set('text', s.capitalize(value))
                set('key', s.underscored(value))
              }}
            />
          </Field>
          <IconPickerControl
            className={styles.iconPicker}
            defaultSelected={value('iconProps').iconName}
            onSelected={(iconName) => set('iconProps', { iconName })}
          />
        </div>
      )}
      <div className={styles.footer}>
        <DynamicButton
          primary={inputVisible.value}
          text={t('reports.saveFilterText')}
          disabled={disabled}
          onClick={onSave}
        />
        <DynamicButton
          hidden={!inputVisible.value}
          text={t('reports.cancelSaveFilterText')}
          onClick={inputVisible.setFalse}
          subtle
        />
      </div>
    </div>
  )
}

SaveFilterForm.displayName = 'SaveFilterForm'
SaveFilterForm.className = styles.saveFilterForm
