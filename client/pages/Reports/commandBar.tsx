import {
  ContextualMenuItemType,
  format,
  IContextualMenuItem
} from 'office-ui-fabric'
import React from 'react'
import { isEmpty, omit, pick } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import getColumns from './columns'
import { IReportsContext } from './context'
import {
  CLEAR_FILTERS,
  REMOVE_SELECTED_FILTER,
  SET_FILTER,
  SET_GROUP_BY,
  TOGGLE_FILTER_PANEL
} from './reducer/actions'
import { SaveFilterForm } from './SaveFilterForm'
import { getGroupByOptions } from './types'
/**
 * Select group by command
 *
 * @param context - Context
 */
const selectGroupByCmd = (context: IReportsContext) =>
  ({
    key: 'SELECT_GROUP_BY',
    text: context.t('common.groupBy'),
    iconProps: { iconName: 'GroupList' },
    subMenuProps: {
      items: getGroupByOptions(context.t).map(
        (opt) =>
          ({
            ...pick(opt, 'key', 'text'),
            canCheck: true,
            checked: context.state.groupBy.fieldName === opt.props.fieldName,
            onClick: () =>
              context.dispatch(SET_GROUP_BY({ groupBy: opt.props }))
          } as IContextualMenuItem)
      )
    }
  } as IContextualMenuItem)

/**
 * Export to Excel command
 *
 * @param context - Context
 */
const exportToExcelCmd = ({ state, t }: IReportsContext) =>
  ({
    key: 'EXPORT_TO_EXCEL',
    text: t('reports.exportToExcel'),
    onClick: () => {
      const fileName = format(
        state.query.exportFileName,
        new Date().toDateString().split(' ').join('-')
      )
      exportExcel(state.subset, {
        columns: getColumns({}, t),
        fileName
      })
    },
    iconProps: { iconName: 'ExcelDocument' }
  } as IContextualMenuItem)

/**
 * Open filter panel command
 *
 * @param context - Context
 */
const openFilterPanelCmd = ({ dispatch }: IReportsContext) =>
  ({
    key: 'OPEN_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    onClick: () => dispatch(TOGGLE_FILTER_PANEL())
  } as IContextualMenuItem)

/**
 * Clear filters
 *
 * @param context - Context
 */
const clearFiltersCmd = ({ state, dispatch }: IReportsContext) =>
  ({
    key: 'CLEAR_FILTERS',
    iconProps: { iconName: 'ClearFilter' },
    iconOnly: true,
    disabled: !state.isFiltered,
    onClick: () => dispatch(CLEAR_FILTERS())
  } as IContextualMenuItem)

/**
 * Save filter  command
 *
 * @param context - Context
 */
const saveFilterCmd = ({
  state,
  dispatch,
  t
}: IReportsContext): IContextualMenuItem =>
  ({
    key: 'SAVED_FILTERS',
    text: state.filter?.text || t('reports.savedFilters'),
    iconProps: state.filter?.iconProps || { iconName: 'ChromeRestore' },
    subMenuProps: {
      items: [
        {
          key: 'SAVE_FILTER',
          onRender: () => (
            <SaveFilterForm style={{ padding: '12px 12px 6px 32px' }} />
          )
        },
        {
          key: 'DIVIDER_O',
          itemType: ContextualMenuItemType.Divider
        },
        state.filter?.text && {
          key: 'REMOVE_SELECTED_FILTER',
          text: t('reports.removeSelectedFilterText'),
          iconProps: { iconName: 'RemoveFilter' },
          onClick: () => dispatch(REMOVE_SELECTED_FILTER())
        },
        {
          key: 'DIVIDER_1',
          itemType: ContextualMenuItemType.Divider
        },
        ...Object.keys(state.savedFilters).map((key) => {
          const filter = state.savedFilters[key]
          return {
            ...(omit(filter, 'values') as IContextualMenuItem),
            canCheck: true,
            checked: filter.text === state.filter?.text,
            onClick: () => dispatch(SET_FILTER({ filter }))
          }
        })
      ].filter((i) => i)
    }
  } as IContextualMenuItem)

export default (context: IReportsContext) => ({
  items:
    !!context.state.query && !context.state.loading
      ? [selectGroupByCmd(context)]
      : [],
  farItems:
    !!context.state.query && !context.state.loading
      ? [
          exportToExcelCmd(context),
          !isEmpty(context.state.savedFilters) && saveFilterCmd(context),
          openFilterPanelCmd(context),
          clearFiltersCmd(context)
        ].filter((i) => i)
      : []
})
