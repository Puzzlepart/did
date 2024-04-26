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
  const additionalMetadata = Object.entries(context.props.additionalMetadata)
  return (
    <FormGroup
      hidden={
        !Boolean(context.state.selectedUser) || _.isEmpty(additionalMetadata)
      }
      title={t('components.userPicker.additionalMetadata')}
      bordered
      className={styles.additionalMetadata}
    >
      {additionalMetadata.map(([key, field]) => (
        <InputField
          hidden={!Boolean(context.state.selectedUser)}
          type={field.type}
          key={key}
          name={key}
          label={field.label}
          value={_.get(
            context.state.selectedUser,
            `additionalMetadata.${key}`,
            ''
          )}
          onChange={(_, { value }) => {
            if (field.type === 'number') {
              value = Number(value)
            }
            context.onSetAdditionalMetadata(key, value)
          }}
        />
      ))}
    </FormGroup>
  )
}
