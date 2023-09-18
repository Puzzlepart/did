import { ICommandBarItemProps } from '@fluentui/react'
import { SearchBox } from '@fluentui/react-search-preview'
import React from 'react'
import { useListContext } from '../context'
import { EXECUTE_SEARCH } from '../reducer'
import { ListMenuItem } from './ListMenuItem'

export function useSearchBoxCommand() {
  const context = useListContext()
  const commandBarItem: ICommandBarItemProps = {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...context.props.searchBox}
        style={{
          minWidth: '600px'
        }}
        defaultValue={context.state.searchTerm}
        onChange={(_event, data) => {
          if (context.props.searchBox.onChange)
            context.props.searchBox.onChange(_event, data)
          context.dispatch(EXECUTE_SEARCH({ searchTerm: data?.value }))
        }}
      />
    )
  }
  if (context.props.searchBox) {
    return {
      commandBarItem,
      menuItem: new ListMenuItem().setCustomRender(commandBarItem.onRender)
    }
  }
  return { commandBarItem: null, menuItem: null }
}
