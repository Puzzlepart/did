/* eslint-disable unicorn/prevent-abbreviations */
import { DynamicButton } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddUserButton.module.scss'
import { useUserPickerContext } from '../context'
import { Shimmered } from 'components/Shimmered'

export const AddUserButton: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  return (
    <Shimmered
      className={styles.addUserButton}
      isDataLoaded={context.state.isDataLoaded}
      width={96}
      height={32}
    >
      <DynamicButton
        disabled={!Boolean(context.state.selectedUser)}
        text={t('components.userPicker.addUser')}
        appearance='primary'
        onClick={context.onAddUser}
      />
    </Shimmered>
  )
}
