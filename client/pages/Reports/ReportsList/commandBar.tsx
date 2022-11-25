import {
  ContextualMenuItemType,
  format,
  IContextualMenuItem
} from '@fluentui/react'
import React from 'react'
import _ from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import { IReportsContext } from '../context'
import {
  CLEAR_FILTERS,
  REMOVE_SELECTED_FILTER,
  SET_FILTER,
  TOGGLE_FILTER_PANEL
} from '../reducer/actions'
import { SaveFilterForm } from '../SaveFilterForm'

/**
 * Export to Excel command
 *
 * @param context - Context
 */
const exportToExcelCmd = ({ state, columns, t }: IReportsContext) =>
  ({
    key: 'EXPORT_TO_EXCEL',
    text: t('reports.exportToExcel'),
    onClick: () => {
      const fileName = format(
        state.preset.exportFileName,
        new Date().toDateString().split(' ').join('-')
      )
      exportExcel(state.subset, {
        columns,
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
          text: t('reports.deleteFilterText'),
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
            ...(_.omit(filter, 'values') as IContextualMenuItem),
            canCheck: true,
            checked: filter.text === state.filter?.text,
            onClick: () => dispatch(SET_FILTER({ filter }))
          }
        })
      ].filter((index) => index)
    }
  } as IContextualMenuItem)

export default (context: IReportsContext) => ({
  items: [],
  farItems:
    !!context.state.preset && !context.state.loading
      ? [
          exportToExcelCmd(context),
          !_.isEmpty(context.state.savedFilters) && saveFilterCmd(context),
          openFilterPanelCmd(context),
          clearFiltersCmd(context)
        ].filter((index) => index)
      : []
})
