/* eslint-disable tsdoc/syntax */
import { Checkbox, Label } from '@fluentui/react'
import get from 'get-value'
import React, { useContext } from 'react'
import _ from 'underscore'
import { SubscriptionContext } from '../../context'
import { ICheckboxFieldProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const CheckboxField = ({
  settingsKey,
  props,
  options
}: ICheckboxFieldProps) => {
  const { onChange, settings } = useContext(SubscriptionContext)
  return (
    <div>
      <Label>{props.label}</Label>
      {Object.keys(options).map((key) => {
        const defaultChecked = _.contains(
          get(settings, settingsKey, { default: [] }),
          key
        )
        return (
          <Checkbox
            key={key}
            defaultChecked={defaultChecked}
            label={options[key]}
            onChange={(_event, checked) => {
              onChange(settingsKey, (value: string[] = []) => {
                if (checked) value.push(key)
                else value.splice(value.indexOf(key), 1)
                return value
              })
            }}
            styles={{ root: { marginBottom: 6 } }}
          />
        )
      })}
    </div>
  )
}
