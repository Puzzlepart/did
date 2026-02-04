import { Switch, SwitchProps } from '@fluentui/react-components'
import { ListMenuItem, ListMenuItemGroup } from 'components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './InactiveCheckbox.module.scss'

export const InactiveCheckbox: ReusableComponent<SwitchProps> = (props) => {
  return (
    <div className={InactiveCheckbox.className}>
      <div className={styles.container}>
        <Switch {...props} onChange={props.onChange} />
      </div>
    </div>
  )
}

/**
 * Get the `<InactiveCheckbox />` as a menu item for usage in a list toolbar.
 *
 * @param label Label for the checkbox
 * @param toggle Toggle state for the checkbox
 * @param disabled Disabled state for the checkbox
 * @param group Group to add the menu item to (defaults to `actions`)
 */
export const InactiveCheckboxMenuItem = (
  label: string,
  onChange: SwitchProps['onChange'],
  disabled = false,
  group: ListMenuItemGroup = 'actions'
) =>
  new ListMenuItem()
    .setCustomRender(() => (
      <InactiveCheckbox label={label} onChange={onChange} disabled={disabled} />
    ))
    .setGroup(group)

InactiveCheckbox.displayName = 'InactiveCheckbox'
InactiveCheckbox.className = styles.inactiveCheckbox
InactiveCheckbox.defaultProps = {}
