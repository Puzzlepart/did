import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric'
import * as React from 'react'

export const ScrollablePaneWrapper = ({ children, condition, height }) =>
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
