/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { IListColumn } from 'components/List/types'
import React from 'react'
import { UserColumn } from '.'

/**
 * Returns list column definition for `<UserColumn >`
 */
export function useUserListColumn(): IListColumn {
  return {
    key: 'user',
    fieldName: 'user',
    name: null,
    minWidth: 180,
    onRender: ({ user }) => <UserColumn user={user} />
  }
}
