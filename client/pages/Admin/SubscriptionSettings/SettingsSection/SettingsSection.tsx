import { CheckboxField, InputField } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { parseInt } from 'utils'
import { ImageField } from './ImageField'
import { MultiCheckboxField } from './MultiCheckboxField'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'
import { useSettingsSection } from './useSettingsSection'

/**
 * @category SubscriptionSettings
 */
export const SettingsSection: TabComponent<ISettingsSectionProps> = (props) => {
  const { fields } = useSettingsSection(props)
  return (
    <div className={SettingsSection.className}>
      {fields
        .filter(({ fieldProps }) => !fieldProps.hidden)
        .map(
          ({
            field,
            fieldProps,
            settingsKey,
            onChange,
            getValueWithDefault
          }) => {
            switch (field.type) {
              case 'text': {
                fieldProps.contentAfter = fieldProps.getContentAfter
                  ? fieldProps.getContentAfter(
                      getValueWithDefault(fieldProps.defaultValue ?? null)
                    )
                  : fieldProps.contentAfter
                return (
                  <InputField
                    {...fieldProps}
                    key={settingsKey}
                    value={getValueWithDefault(fieldProps.defaultValue ?? null)}
                    onChange={(_event, data) => onChange(data.value)}
                  />
                )
              }
              case 'bool': {
                return (
                  <CheckboxField
                    {...fieldProps}
                    key={settingsKey}
                    checked={getValueWithDefault(false)}
                    onChange={(_event, data) => onChange(data.checked)}
                  />
                )
              }
              case 'number': {
                return (
                  <InputField
                    {...fieldProps}
                    key={settingsKey}
                    type='number'
                    value={getValueWithDefault(fieldProps.defaultValue ?? 0)}
                    onChange={(_event, data) => onChange(parseInt(data.value))}
                  />
                )
              }
              case 'checkboxmulti': {
                return (
                  <MultiCheckboxField
                    {...field}
                    key={settingsKey}
                    settingsKey={settingsKey}
                  />
                )
              }
              case 'image': {
                return (
                  <ImageField
                    {...fieldProps}
                    key={settingsKey}
                    value={getValueWithDefault(null)}
                    onChange={onChange}
                  />
                )
              }
            }
          }
        )}
    </div>
  )
}

SettingsSection.displayName = 'SettingsSection'
SettingsSection.className = styles.settingsSection
SettingsSection.defaultProps = {
  fields: []
}
