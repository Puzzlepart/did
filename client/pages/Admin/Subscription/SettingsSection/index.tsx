import {ToggleSection} from 'components/ToggleSection'
import {getValue} from 'helpers'
import {Slider, Toggle} from 'office-ui-fabric-react'
import React, {FunctionComponent, useContext} from 'react'
import {SubscriptionContext} from '../context'
import {CheckboxField} from './CheckboxField'
import styles from './SettingsSection.module.scss'
import {ISettingsSectionProps} from './types'

export const SettingsSection: FunctionComponent<ISettingsSectionProps> = (
  props: ISettingsSectionProps
) => {
  const {settings, onSettingsChanged} = useContext(SubscriptionContext)
  return (
    <ToggleSection
      className={styles.root}
      id={props.id}
      headerText={props.name}>
      {props.fields.map((field) => {
        field.props.set(
          'disabled',
          field.disabledIf && field.disabledIf(settings || {})
        )
        field.props.set(
          'hidden',
          field.hiddenIf && field.hiddenIf(settings || {})
        )
        const _ = [...field.props].reduce(
          (object, [key, value]) => ({...object, [key]: value}),
          {} as any
        )
        const key = `${props.id}.${field.id}`
        let fieldElement: JSX.Element
        // eslint-disable-next-line default-case
        switch (field.type) {
          case 'bool':
            fieldElement = (
              <Toggle
                {..._}
                defaultChecked={getValue(settings, key, false)}
                onChange={(_event, value) => onSettingsChanged(key, value)}
              />
            )
            break
          case 'number':
            fieldElement = (
              <Slider
                {..._}
                defaultValue={getValue(settings, key, 1)}
                onChange={(value) => onSettingsChanged(key, value)}
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
          <div key={field.id} className={styles.inputField} hidden={_.hidden}>
            {fieldElement}
            <span className={styles.inputDescription}>{_.description}</span>
          </div>
        )
      })}
    </ToggleSection>
  )
}
