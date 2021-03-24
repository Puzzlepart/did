import { GroupHeader, IDetailsGroupDividerProps } from 'office-ui-fabric-react'
import React from 'react'

export const ListGroupHeader: React.FC<IDetailsGroupDividerProps> = (props) => {
  return (
    <GroupHeader
      {...props}
      styles={{
        title: { cursor: 'initial' },
        expand: { cursor: 'pointer' },
        headerCount: { display: 'none' }
      }}>
    </GroupHeader>
  )
}
