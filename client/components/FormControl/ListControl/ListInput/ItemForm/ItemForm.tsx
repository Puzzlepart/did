/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import _ from 'lodash'
import React, { FC } from 'react'
import { useListInputContext } from '../context'
import styles from './ItemForm.module.scss'

export const ItemForm: FC = () => {
  const context = useListInputContext()
  return (
    <div className={styles.itemForm}>
      {context.props.fields.map((field, index) => (
        <InputField
          key={index}
          label={field.label}
          type={field.type}
          value={_.get(context, `state.currentItem.${field.key}`, '')}
          onChange={(_, { value }) => {
            context.onFieldChange(
              field,
              field.type === 'number' ? Number(value) : value
            )
          }}
          {...field.props}
        />
      ))}
    </div>
  )
}
