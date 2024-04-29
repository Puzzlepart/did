/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { DropdownField, InputField } from 'components'
import _ from 'lodash'
import React from 'react'
import { useUserPickerContext } from '../context'
import { AdditionalMetadataField } from '../types'

export function useFieldRenderer() {
  const context = useUserPickerContext()
  return (field: AdditionalMetadataField, key: string) => {
    if (!field) return null
    switch (field.type) {
      case 'choice': {
        return (
          <DropdownField
            key={key}
            label={field.label}
            required={field.required}
            onChange={(_event, { selectedOptions }) => {
              const transformFunction = _.get(
                field,
                'props.transformFunc',
                null
              ) as (selectedOptions: any) => Record<string, any>
              if (transformFunction) {
                const keyValuePairs = transformFunction(selectedOptions)
                if (!keyValuePairs) return
                context.onSetAdditionalMetadata(keyValuePairs)
                return
              }
              context.onSetAdditionalMetadata({
                [key]: selectedOptions[0]
              })
            }}
            values={_.get(field, 'props.values', [])}
          />
        )
      }
      default: {
        return (
          <InputField
            hidden={!Boolean(context.state.selectedUser)}
            type={field.type as 'text' | 'number'}
            key={key}
            name={key}
            label={field.label}
            required={field.required}
            value={_.get(
              context.state.selectedUser,
              `additionalMetadata.${key}`,
              ''
            )}
            onChange={(_, { value }) => {
              if (field.type === 'number') {
                value = Number(value)
              }
              context.onSetAdditionalMetadata({ [key]: value })
            }}
            {...field.props}
          />
        )
      }
    }
  }
}
