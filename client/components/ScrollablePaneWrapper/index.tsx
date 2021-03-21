/* eslint-disable tsdoc/syntax */
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react'
import React, { FC } from 'react'

/**
 * Conditionally wraps `children` in `<ScrollablePane />` based
 * on `condition`
 *
 * @category Function Component
 */
export const ScrollablePaneWrapper: FC<any> = ({
  children,
  condition,
  height
}) =>
  condition ? (
    <div style={{ position: 'relative', height }}>
      <ScrollablePane
        scrollbarVisibility={ScrollbarVisibility.auto}
        styles={{ contentContainer: { overflowX: 'hidden' } }}>
        {children}
      </ScrollablePane>
    </div>
  ) : (
    children
  )
