import { ReusableComponent } from 'components/types'
import React from 'react'

/**
 * Conditionally wraps `children` in `<ScrollablePane />` based
 * on `condition`
 *
 * @category Reusable Component
 */
export const ScrollablePaneWrapper: ReusableComponent<any> = ({
  children,
  condition,
  height
}) =>
  condition ? (
    <div
      style={{
        position: 'relative',
        height,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {children}
    </div>
  ) : (
    children
  )
