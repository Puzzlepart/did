import { getValue } from 'helpers'
import { Checkbox, Label } from 'office-ui-fabric-react'
import React, { useContext } from 'react'
import { contains } from 'underscore'
import { SubscriptionContext } from '../../context'
import { ICheckboxFieldProps } from './types'

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
        const defaultChecked = contains(
          getValue(settings, settingsKey, []),
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
