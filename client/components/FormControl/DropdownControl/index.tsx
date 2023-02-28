/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import styles from './DropdownControl.module.scss'
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
    <div className={styles.root} {..._.pick(props, 'hidden')}>
      <Dropdown
        {...props}
        onChange={(_event, option) => {
          props.model.set(props.name, option[props.setValue || 'key'])
        }}
        defaultSelectedKey={props.model.value(props.name) as string}
      />
      <div className={styles.description}>
        <ReactMarkdown>{props.description}</ReactMarkdown>
      </div>
    </div>
  )
}

export * from './types'
