import { ICommandBarItemProps } from '@fluentui/react'
import { SearchBox } from '@fluentui/react-search-preview'
import React from 'react'
import { useListContext } from '../../context'
import { EXECUTE_SEARCH } from '../../reducer'
import _ from 'lodash'
import { ListMenuItem } from './ListMenuItem'

export function useSearchBoxCommand() {
  const context = useListContext()
  const commandBarItem: ICommandBarItemProps = {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {..._.omit(context.props.searchBox, 'placeholder', 'fullWidth')}
        placeholder={
          _.isFunction(context.props.searchBox.placeholder)
            ? context.props.searchBox.placeholder(context.state)
            : context.props.searchBox.placeholder
        }
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
  if (context.props.searchBox && !context.props.searchBox.fullWidth) {
    return {
      commandBarItem,
      menuItem: new ListMenuItem().setCustomRender(commandBarItem.onRender)
    }
  }
  return { commandBarItem: null, menuItem: null }
}
