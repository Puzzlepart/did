import {
  GroupHeader,
  IDetailsGroupDividerProps,
  useTheme
} from '@fluentui/react'
import React, { FC } from 'react'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (props) => {
  const theme = useTheme()
  const { holiday } = props.group?.data ?? {}
  return (
    <div title={holiday?.name}>
      <GroupHeader
        {...props}
        styles={{
          title: {
            fontWeight: 'normal',
            color: holiday && theme.palette.red
          },
          expand: { cursor: 'pointer' },
          headerCount: { display: 'none' }
        }}
      />
    </div>
  )
}
