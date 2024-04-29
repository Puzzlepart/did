/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './UserMetadataCell.module.scss'
import { IUserMetadataCellProps } from './types'
import { useValueRenderer } from './useValueRenderer'
import { useUserMetadataCell } from './useUserMetadataCell'
import { useUserPickerContext } from '../../context'
import { mergeClasses } from '@fluentui/react-components'

export const UserMetadataCell: FC<IUserMetadataCellProps> = (props) => {
  const { t } = useTranslation()
  const context = useUserPickerContext()
  const { value, onChange, editing } = useUserMetadataCell(props)
  const renderValue = useValueRenderer()
  return (
    <div className={styles.userMeadataCell}>
      {editing.value && context.props.list?.allowEdit ? (
        <InputField
          className={styles.input}
          value={value}
          onChange={onChange}
          onEnter={() => {
            props.onChange(value)
            editing.toggle()
          }}
        />
      ) : (
        <span
          className={mergeClasses(
            styles.value,
            context.props.list?.allowEdit && styles.editable
          )}
          onClick={editing.toggle}
        >
          {renderValue(value, props, t('common.notSet'))}
        </span>
      )}
    </div>
  )
}
