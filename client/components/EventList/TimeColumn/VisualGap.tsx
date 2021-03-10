/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import { TimeEntry } from 'types'

/**
 * @category Function Component
 */
export const VisualGap: FunctionComponent<{
  current: TimeEntry
  next: TimeEntry
}> = ({ current, next }): JSX.Element => {
  return (
    <>
      <div
        style={{
          height: 50,
          width: 1,
          borderLeft: '1px dottted #000',
          position: 'absolute'
        }}></div>
      <div style={{ zIndex: 2, background: '#f3f2f1', padding: '1px 10px' }}>
        30min
      </div>
    </>
  )
}
