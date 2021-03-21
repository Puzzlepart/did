/* eslint-disable tsdoc/syntax */

import { TabComponent } from 'components'
import { getValue as get } from 'helpers'
import { Slider, TextField, Toggle } from 'office-ui-fabric-react'
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
                {...fieldProps}
                defaultValue={fieldProps.defaultValue}
                onChange={(_event, value) => onChange(key, value)}
              />
            )
            break
          case 'bool':
            fieldElement = (
              <Toggle
                {...fieldProps}
                defaultChecked={get(settings, key, false)}
                inlineLabel={true}
                onChange={(_event, value) => onChange(key, value)}
              />
            )
            break
          case 'number':
            fieldElement = (
              <Slider
                {...fieldProps}
                defaultValue={get(settings, key, 1)}
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
            hidden={fieldProps.hidden}>
            {fieldElement}
            <span className={styles.inputDescription}>
              {fieldProps.description}
            </span>
          </div>
        )
      })}
    </div>
  )
}
