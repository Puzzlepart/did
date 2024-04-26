/* eslint-disable unicorn/prevent-abbreviations */
import React, { FC, useState } from 'react'
import { IUserMeadataCellProps } from './types'
import { useBoolean } from 'usehooks-ts'
import { InputField } from 'components'
import styles from './UserMeadataCell.module.scss'

export const UserMeadataCell: FC<IUserMeadataCellProps> = (props) => {
  const [value, setValue] = useState(props.user[props.field] ?? 'Ikke satt')
  const editing = useBoolean(false)
  return (
    <div className={styles.userMeadataCell}>
      {editing.value ? (
        <InputField
          value={value}
          onChange={(_, { value }) => setValue(value)}
          onEnter={() => {
            // eslint-disable-next-line no-console
            console.log('onEnter')
            props.onChange(value)
            editing.toggle()
          }}
        />
      ) : (
        <span className={styles.value} onClick={editing.toggle}>
          {value}
        </span>
      )}
    </div>
  )
}
