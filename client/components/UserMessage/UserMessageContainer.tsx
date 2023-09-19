import { ReusableComponent } from 'components/types'
import React from 'react'
import { IUserMessageContainerProps } from './types'

export const UserMessageContainer: ReusableComponent<IUserMessageContainerProps> =
  ({ height, gap, spread, vertical, margin, children }) => (
    <div
      style={{
        width: '100%',
        height,
        display: 'flex',
        gap,
        flexDirection: vertical ? 'column' : 'row',
        justifyContent: `space-${spread}`,
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        margin: margin
      }}
    >
      {children}
    </div>
  )

UserMessageContainer.defaultProps = {
  vertical: false,
  spread: 'evenly',
  height: '100%',
  gap: 10,
  margin: 0
}
