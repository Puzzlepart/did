import { ContextualMenu } from '@fluentui/react'
import React, { FC } from 'react'
import { useColumnHeaderContextMenu } from './useColumnHeaderContextMenu'

export const ColumnHeaderContextMenu: FC = () => {
  const contextualMenuProps = useColumnHeaderContextMenu()
  return contextualMenuProps && <ContextualMenu {...contextualMenuProps} />
}
