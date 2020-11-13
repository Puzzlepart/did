import { contains } from 'underscore'
import { getValue } from 'helpers'
import { Checkbox, Label } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { SubscriptionContext } from '../../context'
import { ICheckboxFieldProps } from './types'

export const CheckboxField = ({ id, props,settings,options }: ICheckboxFieldProps) => {
    const { onSettingsChanged } = useContext(SubscriptionContext)
    return (
        <div>
            <Label>{props.get('label')}</Label>
            {Object.keys(options).map(key => (
                <Checkbox
                    key={key}
                    defaultChecked={contains(getValue(settings, id, []), key)}
                    label={options[key]}
                    onChange={(_e, checked) => {
                        onSettingsChanged(`${id}.${id}`, (value: string[]) => {
                            value = value || []
                            if (checked) value.push(key)
                            else value = value.splice(value.indexOf(key), 1)
                            return value
                        })
                    }}
                    styles={{ root: { marginBottom: 6 } }} />
            ))}
        </div>
    )
}