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
  const { onChange, settings } = useContext(SubscriptionContext)
  return (
    <Field label={props.label} description={props.description}>
      {Object.keys(options).map((key) => {
        const defaultChecked = _.contains(
          get(settings, settingsKey, { default: [] }),
          key
        )
        return (
          <div key={key}>
            <Checkbox
              defaultChecked={defaultChecked}
              label={options[key]}
              onChange={(_event, checked) => {
                onChange(settingsKey, (value: string[] = []) => {
                  if (checked) value.push(key)
                  else value.splice(value.indexOf(key), 1)
                  return value
                })
              }}
            />
          </div>
        )
      })}
    </Field>
  )
}
