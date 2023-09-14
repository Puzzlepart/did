import { Switch, SwitchProps } from '@fluentui/react-components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './InactiveCheckbox.module.scss'

export const InactiveCheckbox: ReusableComponent<SwitchProps> = (props) => {
  return (
    <div className={InactiveCheckbox.className}>
      <Switch {...props} onChange={props.onChange} />
    </div>
  )
}

/**
 * Get the `<InactiveCheckbox />` as a menu item for usage in a list toolbar.
 *
 * @param label Label for the checkbox
 * @param toggle Toggle state for the checkbox
 * @param group Group to add the menu item to (defaults to `actions`)
 */
export const InactiveCheckboxMenuItem = (
  label: string,
  onChange: SwitchProps['onChange'],
  group = 'actions'
) =>
  new ListMenuItem()
    .setCustomRender(() => (
      <InactiveCheckbox label={label} onChange={onChange} />
    ))
    .setGroup(group)

InactiveCheckbox.displayName = 'InactiveCheckbox'
InactiveCheckbox.className = styles.inactiveCheckbox
InactiveCheckbox.defaultProps = {
  labelPosition: 'after'
}
