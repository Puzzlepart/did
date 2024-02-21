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
  return (
    <Field label={props.label} description={props.description}>
      {Object.keys(options).map((key) => {
        const defaultChecked = _.contains(
          get(context.settings, settingsKey, { default: [] }),
          key
        )
        return (
          <div key={key}>
            <Checkbox
              defaultChecked={defaultChecked}
              label={options[key]}
              onChange={(_event, { checked }) => {
                context.onChange(settingsKey, (value: string[] = []) => {
                  return checked ? [...value, key] : _.without(value, key)
                })
              }}
            />
          </div>
        )
      })}
    </Field>
  )
}
