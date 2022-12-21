import { ActionButton, TextField } from '@fluentui/react'
import { IconPicker } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import styles from './SaveFilterForm.module.scss'
import { ISaveFilterFormProps } from './types'
import { useSaveFilterForm } from './useSaveFilterForm'

/**
 * @category Reports
 */
export const SaveFilterForm: FC<ISaveFilterFormProps> = (props) => {
  const { t } = useTranslation()
  const { inputVisible, setInputVisible, value, set, onSave } =
    useSaveFilterForm()

  return (
    <div className={styles.root} style={props?.style}>
      <div hidden={!inputVisible}>
        <TextField
          value={value('text')}
          placeholder={t('reports.filterNamePlaceholder')}
          required={true}
          onChange={(_event, value) => {
            set('text', s.capitalize(value))
            set('key', s.underscored(value))
          }}
        />
      </div>
      <div hidden={!inputVisible}>
        <IconPicker
          defaultSelected={value('iconProps').iconName}
          onSelected={(iconName) => set('iconProps', { iconName })}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.saveBtn}>
          <ActionButton
            primary={inputVisible}
            text={t('reports.saveFilterText')}
            disabled={
              (value('text')?.length < 2 && inputVisible) || props.disabled
            }
            iconProps={{ iconName: 'SaveTemplate' }}
            onClick={onSave}
          />
        </div>
        <div hidden={!inputVisible}>
          <ActionButton
            className={styles.saveBtn}
            text={t('reports.cancelSaveFilterText')}
            iconProps={{ iconName: 'Cancel' }}
            onClick={() => setInputVisible(false)}
          />
        </div>
      </div>
    </div>
  )
}
