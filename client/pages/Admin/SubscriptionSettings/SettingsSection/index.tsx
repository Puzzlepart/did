
import { omit, Slider, TextField, Toggle } from '@fluentui/react'
import { SubText, TabComponent } from 'components'
import get from 'get-value'
import React, { useContext } from 'react'
import { SubscriptionContext } from '../context'
import { CheckboxField } from './CheckboxField'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const SettingsSection: TabComponent<ISettingsSectionProps> = (props) => {
  const { settings, onChange } = useContext(SubscriptionContext)
  return (
    <div className={styles.root}>
      {props.fields.map((field) => {
        const fieldProps = { ...field.props } as any
        fieldProps.disabled =
          field.disabledIf && field.disabledIf(settings || {})
        fieldProps.hidden = field.hiddenIf && field.hiddenIf(settings || {})
        const key = `${props.itemKey}.${field.id}`
        let fieldElement: JSX.Element
        switch (field.type) {
          case 'text':
            fieldElement = (
              <TextField
                {...omit(fieldProps, ['description'])}
                defaultValue={get(settings, key, {
                  default: fieldProps.defaultValue
                })}
                onChange={(_event, value) => onChange(key, value)}
              />
            )
            break
          case 'bool':
            fieldElement = (
              <Toggle
                {...fieldProps}
                defaultChecked={get(settings, key, { default: false })}
                inlineLabel={true}
                onChange={(_event, value) => onChange(key, value)}
              />
            )
            break
          case 'number':
            fieldElement = (
              <Slider
                {...fieldProps}
                defaultValue={get(settings, key, { default: 1 })}
                onChange={(value) => onChange(key, value)}
              />
            )
            break
          case 'checkbox':
            fieldElement = (
              <CheckboxField {...field} settingsKey={key} settings={settings} />
            )
            break
        }
        return (
          <div
            key={field.id}
            className={styles.inputField}
            hidden={fieldProps.hidden}
          >
            {fieldElement}
            <SubText text={fieldProps.description} />
          </div>
        )
      })}
    </div>
  )
}
