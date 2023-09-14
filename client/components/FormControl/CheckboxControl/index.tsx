import { Checkbox } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './CheckboxControl.module.scss'
import { ICheckboxControlProps } from './types'
import { useToggleControlChange } from './useToggleControlChange'

/**
 * Text field based on `<Checkbox />` from `@fluentui/react-components`
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const CheckboxControl: ReusableComponent<ICheckboxControlProps> = (
  props
) => {
  const onChange = useToggleControlChange(props)
  return (
    <div className={CheckboxControl.className} hidden={props.hidden}>
      <Checkbox
        {...props}
        onChange={(event, data) => onChange(event, data.checked)}
        checked={props.model.value<boolean>(props.name, false)}
      />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

CheckboxControl.displayName = 'CheckboxControl'
CheckboxControl.className = styles.checkboxControl

export * from './types'
