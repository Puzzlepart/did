import get from 'get-value'
import { useContext, useMemo } from 'react'
import { SubscriptionContext } from '../context'
import { ISettingsSectionProps } from './types'

/**
 * Custom hook that returns an object containing fields and their corresponding properties
 * for a settings section.
 *
 * @param props - The props for the settings section.
 */
export function useSettingsSection(props: ISettingsSectionProps) {
  const context = useContext(SubscriptionContext)
  const fields = useMemo(() => {
    return props.fields.map((field) => {
      const fieldProps = {
        ...field.props,
        disabled: field.disabledIf && field.disabledIf(context.settings || {}),
        hidden: field.hiddenIf && field.hiddenIf(context.settings || {})
      } as Record<string, any>

      const settingsKey = `${props.id}.${field.id}`

      const getValueWithDefault = (defaultValue: any) => {
        return get(context.settings, settingsKey, { default: defaultValue })
      }
      const onChange = (value: any) => {
        context.onChange(settingsKey, value)
      }

      return {
        field,
        fieldProps,
        settingsKey,
        onChange,
        getValueWithDefault
      }
    })
  }, [props.fields])

  return { fields }
}
