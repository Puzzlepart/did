/* eslint-disable tsdoc/syntax */
import { DefaultButton, IContextualMenuItem, TextField } from '@fluentui/react'
import { IconPicker } from 'components'
import { Json } from 'components/Json'
import { useMap } from 'hooks'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { capitalize, underscored } from 'underscore.string'
import { toMap } from 'utils/toMap'
import { ReportsContext } from '../context'
import { ADD_FILTER } from '../reducer/actions'
import styles from './SaveFilterForm.module.scss'
import { ISaveFilterFormProps } from './types'

const INITIAL_MODEL = toMap({
  key: '',
  text: '',
  iconProps: { iconName: 'Page' }
})

/**
 * @category Reports
 */
export const SaveFilterForm: React.FC<ISaveFilterFormProps> = (props) => {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(ReportsContext)
  const { $, set, $set, value } = useMap<keyof IContextualMenuItem>(INITIAL_MODEL)
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
    dispatch(ADD_FILTER({ model: $ as IContextualMenuItem }))
    $set(INITIAL_MODEL)
  }

  return (
    <div
      className={styles.root}
      style={props?.style}
      hidden={!state.isFiltered || !!state.filter?.text}>
      <Json obj={$} />
      <div hidden={!inputVisible}>
        <TextField
          value={value('text')}
          placeholder={t('reports.filterNamePlaceholder')}
          required={true}
          onChange={(_event, value) => {
            set('text', capitalize(value))
            set('key', underscored(value))
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
            disabled={value('text').length < 2 && inputVisible}
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
