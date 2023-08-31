import { ICommandBarItemProps } from '@fluentui/react'
import { SearchBox } from '@fluentui/react-search-preview'
import React, { MutableRefObject, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useListContext } from '../context'
import { EXECUTE_SEARCH } from '../reducer'
import { ListMenuItem } from './ListMenuItem'

export function useSearchBoxCommand(root: MutableRefObject<any>) {
  const context = useListContext()
  const timeout = useRef(null)
  const commandBarItem: ICommandBarItemProps = {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...context.props.searchBox}
        style={{
          width: isMobile
            ? root?.current?.clientWidth
            : context.props.defaultSearchBoxWidth
        }}
        defaultValue={context.state.searchTerm}
        onChange={(_event, data) => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            if (context.props.searchBox.onChange)
              context.props.searchBox.onChange(_event, data)
            context.dispatch(EXECUTE_SEARCH({ searchTerm: data?.value }))
          }, 250)
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
