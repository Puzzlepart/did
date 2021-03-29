/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { Dropdown } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _  from 'underscore'
import { IDropdownControlProps } from './types'

/**
 * Text field based on `<Dropdown />` from [@fluentui/react](@fluentui/react)
 *
 * @category Reusable Component
 */
export const DropdownControl: ReusableComponent<IDropdownControlProps> = (
  props
) => {
  return (
    <div {..._.pick(props, 'hidden')}>
      <Dropdown
        {...props}
        onChange={(_event, option) => {
          props.model.set(props.name, option[props.setValue || 'key'])
        }}
        defaultSelectedKey={props.model.value(props.name) as string}
      />
    </div>
  )
}

export * from './types'
