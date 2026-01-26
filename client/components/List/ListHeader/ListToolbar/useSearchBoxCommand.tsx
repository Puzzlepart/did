import React from 'react'
import { useListContext } from '../../context'
import { SearchBox } from '../SearchBox'
import { ListMenuItem } from './ListMenuItem'
import { ListCommandBarItem } from '../../types'

export function useSearchBoxCommand() {
  const context = useListContext()
  const commandBarItem: ListCommandBarItem = {
    key: 'SEARCH_BOX',
    onRender: () => <SearchBox {...context.props.searchBox} />
  }
  if (context.props.searchBox && !context.props.searchBox.fullWidth) {
    return {
      commandBarItem,
      menuItem: new ListMenuItem().setCustomRender(commandBarItem.onRender)
    }
  }
  return { commandBarItem: null, menuItem: null }
}
