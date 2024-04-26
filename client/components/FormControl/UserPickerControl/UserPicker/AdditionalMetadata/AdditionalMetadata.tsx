/* eslint-disable unicorn/prevent-abbreviations */
import { FormGroup, InputField } from 'components'
import _ from 'lodash'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AdditionalMetadata.module.scss'
import { useUserPickerContext } from '../context'

export const AdditionalMetadata: FC = () => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  return (
    <FormGroup
      hidden={!Boolean(context.state.selectedUser)}
      title={t('components.userPicker.additionalMetadata')}
      bordered
      className={styles.additionalMetadata}
    >
      {Object.keys(context.props.additionalMetadata).map((key) => (
        <InputField
          hidden={!Boolean(context.state.selectedUser)}
          type={context.props.additionalMetadata[key].type}
          key={key}
          name={key}
          label={context.props.additionalMetadata[key].label}
          value={_.get(
            context.state.selectedUser,
            `additionalMetadata.${key}`,
            ''
          )}
          onChange={(_, { value }) =>
            context.onSetAdditionalMetadata(key, value)
          }
        />
      ))}
    </FormGroup>
  )
}
