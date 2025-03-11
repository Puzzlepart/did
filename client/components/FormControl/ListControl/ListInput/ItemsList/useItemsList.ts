import { isEqual } from 'lodash'
import { useState } from 'react'
import { EditingState } from './types'

export function useItemsList() {
  const [editing, setEditing] = useState<EditingState>(null)

  const onToggleEdit = (index: number, key: string) => {
    setEditing(isEqual(editing, { index, key }) ? null : { index, key })
  }

  const isEditing = (index?: number, key?: string) => Boolean(key) ? isEqual(editing, { index, key }) : Boolean(editing)

  return { onToggleEdit, isEditing }
}
