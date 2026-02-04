import _ from 'underscore'
import { useListContext } from '../../context'
import { TOGGLE_FILTER_PANEL } from '../../reducer'
import { ListMenuItem } from './ListMenuItem'
import { ListCommandBarItem } from '../../types'

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

  const filterItems = context.props.filterPanelItems ?? context.state.origItems
  const hasFilterItems = filterItems.length > 0
  const isFilterLoading = Boolean(context.props.filterPanelLoading)
  const toggleCommandBarItem: ListCommandBarItem = {
    key: 'TOGGLE_FILTER_PANEL',
    iconName: isFilterLoading ? 'ProgressRingDots' : 'Filter',
    disabled: context.props.enableShimmer || !hasFilterItems || isFilterLoading,
    onClick: () => {
      const nextOpen = !context.state.filterPanel?.open
      context.dispatch(TOGGLE_FILTER_PANEL())
      context.props.onFilterPanelToggle?.(nextOpen)
    }
  }

  return {
    toggle: {
      commandBarItem: toggleCommandBarItem,
      menuItem: new ListMenuItem()
        .withIcon('Filter')
        .setOnClick(toggleCommandBarItem.onClick)
        .setDisabled(toggleCommandBarItem.disabled)
        .setHidden(!context.props.filters)
        .setGroup('actions')
    }
  }
}
