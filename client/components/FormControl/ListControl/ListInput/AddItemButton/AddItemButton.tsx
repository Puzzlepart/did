/* eslint-disable unicorn/prevent-abbreviations */
import { DynamicButton } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddItemButton.module.scss'
import { useListInputContext } from '../context'
import { Shimmered } from 'components/Shimmered'

export const AddItemButton: FC = () => {
  const { t } = useTranslation()
  const context = useListInputContext()
  return (
    <Shimmered
      className={styles.addItemButton}
      isDataLoaded={context.state.isDataLoaded}
      width={96}
      height={32}
    >
      <DynamicButton
        disabled={!context.isItemValid()}
        text={t('components.userPicker.addUser')}
        appearance='primary'
        onClick={context.onAddItem}
      />
    </Shimmered>
  )
}
