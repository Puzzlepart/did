/* eslint-disable tsdoc/syntax */
import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react'
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
    <div style={{ position: 'relative', height }}>
      <ScrollablePane
        scrollbarVisibility={ScrollbarVisibility.auto}
        styles={{ contentContainer: { overflowX: 'hidden' } }}
      >
        {children}
      </ScrollablePane>
    </div>
  ) : (
    children
  )
