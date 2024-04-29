import { Checkbox } from '@fluentui/react-components'
import { Field } from 'components'
import get from 'get-value'
import React, { useContext } from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { SubscriptionContext } from '../../context'
import { ICheckboxFieldProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const MultiCheckboxField: StyledComponent<ICheckboxFieldProps> = ({
  settingsKey,
  props,
  options
}) => {
  const context = useContext(SubscriptionContext)
  const items = Object.keys(options)
  const isDefaultChecked = (key: string) =>
    _.contains(get(context.settings, settingsKey, { default: [] }), key)
  return (
    <Field
      label={props.label}
      description={props.description}
      hidden={props.hidden}
    >
      {items.map((key) => (
        <Field key={key}>
          <Checkbox
            defaultChecked={isDefaultChecked(key)}
            label={options[key]}
            onChange={(_event, { checked }) => {
              context.onChange(settingsKey, (value: string[] = []) => {
                return checked
                  ? [...(value ?? []), key]
                  : _.without(value ?? [], key)
              })
            }}
          />
        </Field>
      ))}
    </Field>
  )
}
