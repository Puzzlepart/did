import { GroupHeader, IDetailsGroupDividerProps } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'

export const ListGroupHeader: FunctionComponent<IDetailsGroupDividerProps> = (props: IDetailsGroupDividerProps) => {
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
