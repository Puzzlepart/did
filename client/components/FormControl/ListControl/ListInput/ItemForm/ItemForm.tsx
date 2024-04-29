/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC } from 'react'
import { useListInputContext } from '../context'

export const ItemForm: FC = () => {
  const context = useListInputContext()
  return (
    <>
      {context.props.fields.map((field, index) => (
        <InputField
          key={index}
          label={field.label}
          type={field.type}
          onChange={(_, { value }) => context.onFieldChange(field, value)}
        />
      ))}
    </>
  )
}
