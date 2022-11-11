import { GroupHeader, IDetailsGroupDividerProps } from '@fluentui/react'
import React, { FC } from 'react'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (props) => {
  return (
    <GroupHeader
      {...props}
      styles={{
        title: {
          fontWeight: 'normal'
        },
        expand: { cursor: 'pointer' },
        headerCount: { display: 'none' }
      }}
    />
  )
}
