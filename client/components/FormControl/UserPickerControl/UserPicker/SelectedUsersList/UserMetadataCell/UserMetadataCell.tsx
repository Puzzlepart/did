/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './UserMetadataCell.module.scss'
import { IUserMetadataCellProps } from './types'
import { renderValue } from './renderValue'
import { useUserMetadataCell } from './useUserMetadataCell'

export const UserMetadataCell: FC<IUserMetadataCellProps> = (props) => {
  const { t } = useTranslation()
  const { value, onChange, editing } = useUserMetadataCell(props)
  return (
    <div className={styles.userMeadataCell}>
      {editing.value ? (
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
        <span className={styles.value} onClick={editing.toggle}>
          {renderValue(value, props.field.renderAs, t('common.notSet'))}
        </span>
      )}
    </div>
  )
}
