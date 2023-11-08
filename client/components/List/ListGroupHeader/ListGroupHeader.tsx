import { GroupHeader, IDetailsGroupDividerProps } from '@fluentui/react'
import React, { FC } from 'react'
import { useListGroupHeader } from './useListGroupHeader'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (props) => {
  const { containerProps, groupHeaderProps } = useListGroupHeader(props)
  return (
    <div {...containerProps}>
      <GroupHeader {...groupHeaderProps} />
    </div>
  )
}
