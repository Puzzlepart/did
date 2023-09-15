import { omit } from '@fluentui/react'
import {
  Checkbox,
  Field,
  Input,
  Label,
  useId
} from '@fluentui/react-components'
import { SubText } from 'components'
import { TabComponent } from 'components/Tabs'
import get from 'get-value'
import React, { useContext } from 'react'
import { SubscriptionContext } from '../context'
import { CheckboxField } from './CheckboxField'
import styles from './SettingsSection.module.scss'
import { SliderField } from './SliderField'
import { ISettingsSectionProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const SettingsSection: TabComponent<ISettingsSectionProps> = (props) => {
  const { settings, onChange } = useContext(SubscriptionContext)
  const id = useId()
  return (
    <div className={SettingsSection.className}>
      {props.fields.map((field) => {
        const fieldProps = { ...field.props } as any
        fieldProps.disabled =
          field.disabledIf && field.disabledIf(settings || {})
        fieldProps.hidden = field.hiddenIf && field.hiddenIf(settings || {})
        const key = `${props.id}.${field.id}`
        let fieldElement: JSX.Element
        switch (field.type) {
          case 'text': {
            fieldElement = (
              <Field>
                <Label htmlFor={id} weight='semibold'>
                  {fieldProps.label}
                </Label>
                <Input {...omit(fieldProps, ['description'])} />
              </Field>
            )
            break
          }
          case 'bool': {
            fieldElement = (
              <Checkbox
                {...fieldProps}
                defaultChecked={get(settings, key, { default: false })}
                inlineLabel={true}
                onChange={(_event, data) => onChange(key, data.checked)}
              />
            )
            break
          }
          case 'number': {
            fieldElement = (
              <SliderField
                {...fieldProps}
                onChange={(_event, data) => onChange(key, data.value)}
                settingsKey={key}
              />
            )
            break
          }
          case 'checkbox': {
            fieldElement = (
              <CheckboxField {...field} settingsKey={key} settings={settings} />
            )
            break
          }
        }
        return (
          <div
            key={field.id}
            style={{ width: '100%' }}
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

SettingsSection.displayName = 'SettingsSection'
SettingsSection.className = styles.settingsSection
