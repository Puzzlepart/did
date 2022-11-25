import { DefaultButton, IContextualMenuItem, TextField } from '@fluentui/react'
import { IconPicker } from 'components'
import { useMap } from 'hooks'
import React, { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import { ReportsContext } from '../context'
import { ADD_SAVED_FILTER } from '../reducer/actions'
import styles from './SaveFilterForm.module.scss'
import { INITIAL_MODEL, ISaveFilterFormProps } from './types'

/**
 * @category Reports
 */
export const SaveFilterForm: FC<ISaveFilterFormProps> = (props) => {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(ReportsContext)
  const { $, set, $set, value } = useMap<
    keyof IContextualMenuItem,
    IContextualMenuItem
  >(INITIAL_MODEL)
  const [inputVisible, setInputVisible] = useState(false)

  /**
   * On save filter
   *
   * @remarks Stringifies the saved filters (including the new one)
   * and sends it to the mutation `updateUserConfiguration`.
   */
  function onSave(): void {
    if (!inputVisible) {
      setInputVisible(true)
      return
    }
    dispatch(ADD_SAVED_FILTER({ model: $ }))
    $set(INITIAL_MODEL)
  }

  return (
    <div
      className={styles.root}
      style={props?.style}
      hidden={!!state.filter?.text}
    >
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
          <DefaultButton
            primary={inputVisible}
            text={t('reports.saveFilterText')}
            disabled={value('text')?.length < 2 && inputVisible}
            onClick={onSave}
          />
        </div>
        <div hidden={!inputVisible}>
          <DefaultButton
            className={styles.saveBtn}
            text={t('reports.cancelSaveFilterText')}
            onClick={() => setInputVisible(false)}
          />
        </div>
      </div>
    </div>
  )
}
