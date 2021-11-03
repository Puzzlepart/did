/* eslint-disable tsdoc/syntax */
import { ReusableComponent } from 'components/types'
import React, { HTMLAttributes } from 'react'

interface IJsonDebugProps extends HTMLAttributes<HTMLDivElement> {
  obj: any
  replacer?: (this: any, key: string, value: any) => any
  space?: number | string
}

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
  <div
    style={{
      backgroundColor: '#444',
      color: '#fff',
      padding: 20,
      marginBottom: 20,
      marginTop: 20
    }}
  >
    <pre>{JSON.stringify(obj, replacer, space)}</pre>
  </div>
)
