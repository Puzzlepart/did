import { IDetailsHeaderProps } from 'office-ui-fabric'
import React, { Dispatch } from 'react'
import { ListHeader } from './ListHeader'
import { IListProps, IListState } from './types'

export type RenderListHeaderParams = {
  headerProps: IDetailsHeaderProps
  defaultRender: (props?: IDetailsHeaderProps) => JSX.Element
  props?: IListProps
  state?: IListState
  dispatch?: Dispatch<any>
}

export const onRenderListHeader = ({
  headerProps,
  defaultRender,
  props,
  dispatch
}: RenderListHeaderParams) => {
  if (!!props.onRenderDetailsHeader)
    return onRenderListHeader({ headerProps, defaultRender })
  return (
    <ListHeader
      headerProps={headerProps}
      defaultRender={defaultRender}
      searchBox={props.searchBox}
      commandBar={props.commandBar}
      dispatch={dispatch}
    />
  )
}
