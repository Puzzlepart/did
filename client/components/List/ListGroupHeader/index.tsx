import { GroupHeader, IDetailsGroupDividerProps } from 'office-ui-fabric-react'
import React, { FC } from 'react'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (
  props: IDetailsGroupDividerProps
) => {
  return (
    <GroupHeader
      {...props}
      styles={{
        title: { cursor: 'initial' },
        expand: { cursor: 'pointer' },
        headerCount: { display: 'none' }
      }}></GroupHeader>
  )
}
