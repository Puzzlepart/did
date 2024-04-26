/* eslint-disable unicorn/prevent-abbreviations */
import { DynamicButton } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddUserButton.module.scss'
import { useUserPickerContext } from '../context'

export const AddUserButton: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  return (
    <DynamicButton
      className={styles.addUserButton}
      disabled={context.state.loading || !Boolean(context.state.selectedUser)}
      text={t('components.userPicker.addUser')}
      appearance='primary'
      onClick={context.onAddUser}
    />
  )
}
