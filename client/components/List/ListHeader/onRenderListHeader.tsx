import { IDetailsHeaderProps } from 'office-ui-fabric-react'
import React, { Dispatch } from 'react'
import { ListHeader } from '.'
import { IListProps, IListState } from '../types'

// eslint-disable-next-line unicorn/prevent-abbreviations
export type RenderListHeaderParams = {
  headerProps: IDetailsHeaderProps
  defaultRender: (props?: IDetailsHeaderProps) => JSX.Element
  props?: IListProps
  state?: IListState
  dispatch?: Dispatch<unknown>
}

export const onRenderListHeader = ({
  headerProps,
  defaultRender,
  props,
  state,
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
      state={state}
      dispatch={dispatch}
    />
  )
}
