/* eslint-disable tsdoc/syntax */

import { ToggleSection } from 'components/ToggleSection'
import { getValue as get } from 'helpers'
import { Slider, Toggle } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
import { SubscriptionContext } from '../context'
import { CheckboxField } from './CheckboxField'
import styles from './SettingsSection.module.scss'
import { ISettingsSectionProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const SettingsSection: FunctionComponent<ISettingsSectionProps> = (
  props: ISettingsSectionProps
) => {
  const { settings, onChange } = useContext(SubscriptionContext)
  return (
    <ToggleSection
      className={styles.root}
      id={props.id}
      headerText={props.name}>
      {props.fields.map((field) => {
        const fieldProps = { ...field.props } as any
        fieldProps.disabled =
          field.disabledIf && field.disabledIf(settings || {})
        fieldProps.hidden = field.hiddenIf && field.hiddenIf(settings || {})
        const key = `${props.id}.${field.id}`
        let fieldElement: JSX.Element
        switch (field.type) {
          case 'bool':
            fieldElement = (
              <Toggle
                {...fieldProps}
                defaultChecked={get(settings, key, false)}
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
    </ToggleSection>
  )
}
