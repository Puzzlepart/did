import { getValue } from 'helpers'
import { Icon, Slider, TextField, Toggle } from 'office-ui-fabric'
import React, { useContext, useState } from 'react'
import { omit } from 'underscore'
import { SubscriptionContext } from '../context'
import { CheckboxField } from './CheckboxField'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'

export const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = (props: ISettingsSectionProps) => {
  const { onSettingsChanged } = useContext(SubscriptionContext)
  const [isExpanded, toggle] = useState(props.defaultExpanded)
  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={() => toggle(!isExpanded)}>
        <div className={styles.title}>{props.name}</div>
        <Icon className={styles.chevron} iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'} />
      </div>
      <div hidden={!isExpanded}>
        {props.fields.map((field) => {
          field.props.set('disabled', field.disabledIf && field.disabledIf(props.settings || {}))
          field.props.set('hidden', field.hiddenIf && field.hiddenIf(props.settings || {}))
          const _ = Array.from(field.props).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {} as any)
          let fieldElement: JSX.Element
          switch (field.type) {
            case 'bool':
              fieldElement = (
                <Toggle
                  {..._}
                  defaultChecked={getValue(props.settings, field.id, false)}
                  onChange={(_e, value) => onSettingsChanged(`${props.id}.${field.id}`, value)}
                />
              )
              break
            case 'number':
              fieldElement = (
                <Slider
                  {..._}
                  defaultValue={getValue(props.settings, field.id, 1)}
                  onChange={(value) => onSettingsChanged(`${props.id}.${field.id}`, value)}
                />
              )
              break
            case 'checkbox':
              fieldElement = (
                <CheckboxField {...field} settings={props.settings} />
              )
              break
            default:
              fieldElement = (
                <TextField
                  {...omit(_, 'descripton')}
                  onChange={(_e, value) => onSettingsChanged(`${props.id}.${field.id}`, value)}
                />
              )
          }
          return (
            <div
              key={field.id}
              className={styles.inputField}
              hidden={_.hidden}>
              {fieldElement}
              <span className={styles.inputDescription}>{_.description}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
