import { ICommandBarItemProps } from '@fluentui/react'
import { useListContext } from '../context'
import { CLEAR_FILTERS, TOGGLE_FILTER_PANEL } from '../reducer'
import { ListMenuItem } from './ListMenuItem'
import { useTranslation } from 'react-i18next'

/**
 * Returns an object containing two command bar items for toggling and clearing filters in a list.
 * 
 * @returns An object containing two properties: `toggle` and `clear`, each with a `commandBarItem` property.
 */
export function useFiltersCommand() {
  const { t } = useTranslation()
  const context = useListContext()

  const clearCommandBarItem: ICommandBarItemProps = {
    key: 'CLEAR_FILTERS',
    iconProps: { iconName: 'ClearFilter' },
    iconOnly: true,
    disabled: context.state.origItems.length === context.state.items.length,
    onClick: () => context.dispatch(CLEAR_FILTERS())
  }

  const toggleCommandBarItem: ICommandBarItemProps = {
    key: 'TOGGLE_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    disabled: context.props.enableShimmer,
    onClick: () => context.dispatch(TOGGLE_FILTER_PANEL())
  }

  return {
    toggle: {
      commandBarItem: toggleCommandBarItem,
      menuItem: new ListMenuItem(t('common.toggleFilterPanel'))
        .setIcon('Filter')
        .setOnClick(toggleCommandBarItem.onClick)
        .setDisabled(toggleCommandBarItem.disabled)
    },
    clear: {
      commandBarItem: clearCommandBarItem,
      menuItem: new ListMenuItem(t('common.clearFilters'))
        .setIcon('ClearFilter')
        .setDisabled(clearCommandBarItem.disabled)
    }
  }
}
