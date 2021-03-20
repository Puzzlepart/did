/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { IListColumn } from 'components/List/types'
import { IPersonaProps } from 'office-ui-fabric-react'
import React from 'react'
import { UserColumn } from '.'

/**
 * Returns list column definition for `<UserColumn >`
 *
 * The user object needs to be the item itself, or be
 * on the item with key `user`
 */
export function useUserListColumn(
  persona: IPersonaProps = {},
  props?: Partial<IListColumn>
): IListColumn {
  return {
    ...props,
    key: 'user',
    fieldName: 'user',
    name: null,
    minWidth: 50,
    onRender: (item) => (
      <UserColumn user={item?.user || item} persona={persona} />
    )
  }
}
