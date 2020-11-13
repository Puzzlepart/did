import { getValue } from 'helpers'
import { Icon, Slider, TextField, Toggle, Checkbox, Label } from 'office-ui-fabric'
import React, { useState } from 'react'
import { contains, omit } from 'underscore'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'

export const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = (props: ISettingsSectionProps) => {
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
                  onChange={(_e, value) => props.onSettingsChanged(`${props.id}.${field.id}`, value)}
                />
              )
              break
            case 'number':
              fieldElement = (
                <Slider
                  {..._}
                  defaultValue={getValue(props.settings, field.id, 1)}
                  onChange={(value) => props.onSettingsChanged(`${props.id}.${field.id}`, value)}
                />
              )
              break
            case 'checkbox':
              fieldElement = (
                <>
                  <Label>{_.label}</Label>
                  {Object.keys(field.options).map(key => (
                    <Checkbox
                      key={key}
                      defaultChecked={contains(getValue(props.settings, field.id, []), key)}
                      label={field.options[key]}
                      onChange={(_e, checked) => {
                        props.onSettingsChanged(`${props.id}.${field.id}`, (value: string[]) => {
                          value = value || []
                          if (checked) value.push(key)
                          else value = value.splice(value.indexOf(key), 1)
                          return value
                        })
                      }}
                      styles={{ root: { marginBottom: 6 } }} />
                  ))}
                </>
              )
              break
            default:
              fieldElement = (
                <TextField
                  {...omit(_, 'descripton')}
                  onChange={(_e, value) => props.onSettingsChanged(`${props.id}.${field.id}`, value)}
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
