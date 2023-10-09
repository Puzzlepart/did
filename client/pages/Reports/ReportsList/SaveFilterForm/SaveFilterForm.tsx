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
  const { inputVisible, setInputVisible, value, set, onSave, disabled } =
    useSaveFilterForm()

  return (
    <div className={SaveFilterForm.className}>
      {inputVisible && (
        <div className={styles.body}>
          <Field className={styles.nameInput} required={true}>
            <Input
              value={value('text')}
              placeholder={t('reports.filterNamePlaceholder')}
              required={true}
              onChange={(_event, { value }) => {
                set('text', s.capitalize(value))
                set('key', s.underscored(value))
              }}
            />
          </Field>
          <IconPickerControl
            className={styles.iconPicker}
            required={true}
            defaultSelected={value('iconProps').iconName}
            onSelected={(iconName) => set('iconProps', { iconName })}
          />
        </div>
      )}
      <div className={styles.footer}>
        <DynamicButton
          primary={inputVisible}
          text={t('reports.saveFilterText')}
          disabled={disabled}
          onClick={onSave}
        />
        <DynamicButton
          hidden={!inputVisible}
          text={t('reports.cancelSaveFilterText')}
          onClick={() => setInputVisible(false)}
          subtle
        />
      </div>
    </div>
  )
}

SaveFilterForm.displayName = 'SaveFilterForm'
SaveFilterForm.className = styles.saveFilterForm
