/* eslint-disable unicorn/prevent-abbreviations */
import { DynamicButton } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useListInputContext } from '../context'
import styles from './AddItemButton.module.scss'

export const AddItemButton: FC = () => {
  const { t } = useTranslation()
  const context = useListInputContext()
  return (
    <div className={styles.addItemButton}>
      <DynamicButton
        disabled={!context.isItemValid()}
        text={t('components.userPicker.addUser')}
        appearance='primary'
        onClick={context.onAddItem}
      />
    </div>
  )
}
