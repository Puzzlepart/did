import { GroupHeader, IDetailsGroupDividerProps } from '@fluentui/react'
import React, { FC } from 'react'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (props) => {
  const { holiday } = props.group.data
  return (
    <div title={holiday?.name}>
      <GroupHeader
        {...props}
        styles={{
          title: {
            fontWeight: 'normal',
            color: holiday && '#CC0000'
          },
          expand: { cursor: 'pointer' },
          headerCount: { display: 'none' },
        }}
      />
    </div>
  )
}
