import {
  ContextualMenuItemType,
  format,
  IContextualMenuItem
} from 'office-ui-fabric'
import React from 'react'
import { pick } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import getColumns from './columns'
import { IReportsContext } from './context'
import { SET_FILTER, SET_GROUP_BY, TOGGLE_FILTER_PANEL } from './reducer'
import { SaveFilterForm } from './SaveFilterForm'
import { getGroupByOptions } from './types'
/**
 * Select group by command
 * 
 * @param {IReportsContext} context Context
 */
const selectGroupByCmd = (context: IReportsContext) => ({
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
        onClick: () => context.dispatch(SET_GROUP_BY({ groupBy: opt.props }))
      } as IContextualMenuItem)
    )
  }
})

/**
 * Export to Excel command
 * 
 * @param {IReportsContext} context Context
 */
const exportToExcelCmd = (context: IReportsContext) => ({
  key: 'EXPORT_TO_EXCEL',
  text: context.t('reports.exportToExcel'),
  onClick: () => {
    const fileName = format(
      context.state.query.exportFileName,
      new Date().toDateString().split(' ').join('-')
    )
    exportExcel(context.state.subset, {
      columns: getColumns({}, context.t),
      fileName
    })
  },
  iconProps: { iconName: 'ExcelDocument' }
})

/**
 * Open filter panel command
 * 
 * @param {IReportsContext} context Context
 */
const openFilterPanelCmd = (context: IReportsContext) => ({
  key: 'OPEN_FILTER_PANEL',
  iconProps: { iconName: 'Filter' },
  iconOnly: true,
  onClick: () => context.dispatch(TOGGLE_FILTER_PANEL())
})

/**
 * Save filter  command
 * 
 * @param {IReportsContext} context Context
 */
const saveFilterCmd = (context: IReportsContext): IContextualMenuItem => ({
  key: 'SAVED_FILTERS',
  text: context.t('reports.savedFilters'),
  subMenuProps: {
    items: [
      {
        key: 'SAVE_FILTER',
        onRender: () => <SaveFilterForm />
      },
      {
        key: 'DIVIDER_O',
        itemType: ContextualMenuItemType.Divider
      },
      ...context.state.savedFilters.map((filter, idx) => ({
        key: idx.toString(),
        text: filter.name,
        canCheck: true,
        checked: filter.name === context.state.filter?.name,
        onClick: () => context.dispatch(SET_FILTER({ filter }))
      }))
    ]
  }
})

export default (context: IReportsContext) => ({
  items: (!!context.state.query && !context.state.loading) ? [selectGroupByCmd(context)] : [],
  farItems:
    (!!context.state.query && !context.state.loading)
      ? [
        exportToExcelCmd(context),
        saveFilterCmd(context),
        openFilterPanelCmd(context),
      ]
      : []
})
