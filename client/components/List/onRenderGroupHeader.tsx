import { GroupHeader, IDetailsGroupDividerProps } from 'office-ui-fabric'
import React from 'react'

export const onRenderGroupHeader = (headerProps: IDetailsGroupDividerProps) => {
  return (
    <GroupHeader
      {...headerProps}
      styles={{
        title: { cursor: 'initial' },
        expand: { cursor: 'pointer' },
        headerCount: { display: 'none' }
      }}></GroupHeader>
  )
}
