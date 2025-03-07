import { useListContext } from 'components/List/context'
import { TOGGLE_VIEW_COLUMNS_PANEL } from 'components/List/reducer'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListMenuItem } from '../../ListHeader/ListToolbar/ListMenuItem'
import { isMobile } from 'react-device-detect'

/**
 * Custom hook that creates a `ListMenuItem` for editing view columns.
 *
 * This hook utilizes the `useListContext` and `useTranslation` hooks to get the necessary context and translation functions.
 * It returns a memoized `ListMenuItem` configured with various properties such as label, group, icon, disabled state, hidden state, and dispatch action.
 *
 * @returns A configured `ListMenuItem` instance for editing view columns.
 */
export function useViewColumnsEditCommand(): ListMenuItem {
  const context = useListContext()
  const { t } = useTranslation()
  return useMemo(() => {
    return new ListMenuItem(t('reports.viewColumnsLabel'))
      .setGroup('actions')
      .withIcon('Settings')
      .setDisabled(context.props.enableShimmer)
      .setHidden(!context.props.enableViewColumnsEdit || isMobile)
      .withDispatch(context, TOGGLE_VIEW_COLUMNS_PANEL)
  }, [context.props.enableViewColumnsEdit, context.props.enableShimmer])
}
