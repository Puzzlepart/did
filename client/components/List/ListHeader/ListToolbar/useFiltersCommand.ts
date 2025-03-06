import { ICommandBarItemProps } from '@fluentui/react'
import _ from 'underscore'
import { useListContext } from '../../context'
import { TOGGLE_FILTER_PANEL } from '../../reducer'
import { ListMenuItem } from './ListMenuItem'

/**
 * Returns an object containing two command bar items for toggling and clearing filters in a list.
 *
 * If no columns are filterable, the `toggle` and `clear` properties will be undefined.
 *
 * @returns An object containing two properties: `toggle` and `clear`, each with a `commandBarItem` property.
 */
export function useFiltersCommand() {
  const context = useListContext()

  const hasFilterableColumns = _.any(
    context.props.columns,
    (col) => col?.data?.isFilterable
  )

  if (!hasFilterableColumns) {
    return {
      toggle: undefined
    }
  }

  const toggleCommandBarItem: ICommandBarItemProps = {
    key: 'TOGGLE_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    disabled:
      context.props.enableShimmer || context.state.origItems.length === 0,
    onClick: () => context.dispatch(TOGGLE_FILTER_PANEL())
  }

  return {
    toggle: {
      commandBarItem: toggleCommandBarItem,
      menuItem: new ListMenuItem()
        .withIcon('Filter')
        .setOnClick(toggleCommandBarItem.onClick)
        .setDisabled(toggleCommandBarItem.disabled)
        .setGroup('actions')
    }
  }
}
