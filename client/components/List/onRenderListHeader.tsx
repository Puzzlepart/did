import { IDetailsHeaderProps, SearchBox } from 'office-ui-fabric'
import React, { Dispatch } from 'react'
import styles from './List.module.scss'
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
  state,
  dispatch
}: RenderListHeaderParams) => {
  if (!!props.onRenderDetailsHeader) return onRenderListHeader({ headerProps, defaultRender })
  const searchBox = props.searchBox && {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...props.searchBox}
        value={state.searchTerm}
        className={styles.searchBox}
        onChange={(_event, newValue) => {
          if (props.searchBox.onChange) props.searchBox.onChange(_event, newValue)
          dispatch({ type: 'SEARCH', payload: newValue })
        }}
      />
    )
  }
  return (
    <ListHeader
      headerProps={headerProps}
      defaultRender={defaultRender}
      commandBar={{
        ...props.commandBar,
        items: [searchBox, ...props.commandBar.items].filter((c) => c)
      }}
    />
  )
}
