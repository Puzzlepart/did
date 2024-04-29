/* eslint-disable unicorn/prevent-abbreviations */
import { DynamicButton } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddUserButton.module.scss'
import { useUserPickerContext } from '../context'
import { Shimmered } from 'components/Shimmered'
import _ from 'lodash'

export const AddUserButton: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  const requiredFields = Object.keys(context.props.additionalMetadata).filter(
    (key) => context.props.additionalMetadata[key]?.required
  )
  return (
    <Shimmered
      className={styles.addUserButton}
      isDataLoaded={context.state.isDataLoaded}
      width={96}
      height={32}
    >
      <DynamicButton
        disabled={requiredFields.some(
          (key) =>
            _.get(
              context,
              `state.selectedUser.additionalMetadata.${key}`,
              null
            ) === null
        )}
        text={t('components.userPicker.addUser')}
        appearance='primary'
        onClick={context.onAddUser}
      />
    </Shimmered>
  )
}
