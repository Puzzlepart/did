import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './JsonDebug.module.scss'
import { IJsonDebugProps } from './types'

/**
 * Simple componet showing the specified obj in a
 * `<pre />` element
 *
 * @category Reusable Component
 */
export const JsonDebug: ReusableComponent<IJsonDebugProps> = ({
  obj,
  replacer = null,
  space = 4
}) => (
  <div className={JsonDebug.className}>
    <pre>{JSON.stringify(obj, replacer, space)}</pre>
  </div>
)

JsonDebug.displayName = 'JsonDebug'
JsonDebug.className = styles.jsonDebug
