/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import styles from './UserMetadataCell.module.scss'
import { IUserMetadataCellProps } from './types'
import { formatCurrency } from 'utils'

function renderValue(value: string | number, renderAs: 'currency') {
  switch (renderAs) {
    case 'currency': {
      return formatCurrency(value as number)
    }
    default: {
      return value
    }
  }
}

export const UserMetadataCell: FC<IUserMetadataCellProps> = (props) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(props.user[props.id] ?? t('common.notSet'))
  const editing = useBoolean(false)
  return (
    <div className={styles.userMeadataCell}>
      {editing.value ? (
        <InputField
          value={value}
          onChange={(_, { value }) => setValue(value)}
          onEnter={() => {
            props.onChange(value)
            editing.toggle()
          }}
        />
      ) : (
        <span className={styles.value} onClick={editing.toggle}>
          {renderValue(value, props.field.renderAs)}
        </span>
      )}
    </div>
  )
}
