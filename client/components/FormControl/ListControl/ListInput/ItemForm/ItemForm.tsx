import { InputField } from 'components'
import _ from 'lodash'
import React, { FC } from 'react'
import { useListInputContext } from '../context'
import styles from './ItemForm.module.scss'
import { Field, Switch } from '@fluentui/react-components'
import { ListField } from '../types'

export const ItemForm: FC = () => {
  const context = useListInputContext()

  const renderField = (
    field: ListField<Record<string, any>>,
    index: number
  ) => {
    switch (field.type) {
      case 'boolean': {
        return (
          <Field
            key={index}
            label={field.label}
            {..._.pick(
              field.props?.form,
              'label',
              'hint',
              'required',
              'validationMessage',
              'validationState'
            )}
          >
            <Switch
              checked={_.get(context, `state.currentItem.${field.key}`, false)}
              onChange={(_, { checked }) => {
                context.onFieldChange(field, checked)
              }}
              {..._.pick(field.props?.form, 'disabled')}
            />
          </Field>
        )
      }
      default: {
        return (
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
            {...field.props?.form}
          />
        )
      }
    }
  }
  return (
    <div className={styles.itemForm}>
      {context.props.fields.map((field, index) => renderField(field, index))}
    </div>
  )
}
