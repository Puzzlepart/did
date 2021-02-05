import { AnyAction } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import {
  ContextualMenuItemType,

  format,
  IContextualMenuItem
} from 'office-ui-fabric'
import React from 'react'
import { pick } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import getColumns from './columns'
import { SET_FILTER, SET_GROUP_BY, TOGGLE_FILTER_PANEL } from './reducer'
import { SaveFilter } from './SaveFilter'
import { getGroupByOptions, IReportsState } from './types'
interface IReportsCommmandParams {
  state?: IReportsState
  dispatch?: React.Dispatch<AnyAction>
  t?: TFunction
}

/**
 * Select group by command
 */
const selectGroupByCmd = ({ state, dispatch, t }: IReportsCommmandParams) => ({
  key: 'SELECT_GROUP_BY',
  text: t('common.groupBy'),
  iconProps: { iconName: 'GroupList' },
  subMenuProps: {
    items: getGroupByOptions(t).map(
      (opt) =>
      ({
        ...pick(opt, 'key', 'text'),
        canCheck: true,
        checked: state.groupBy.fieldName === opt.props.fieldName,
        onClick: () => dispatch(SET_GROUP_BY({ groupBy: opt.props }))
      } as IContextualMenuItem)
    )
  }
})

/**
 * Export to Excel command
 */
const exportToExcelCmd = ({ state, t }: IReportsCommmandParams) => ({
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
})

/**
 * Open filter panel command
 */
const openFilterPanelCmd = ({ dispatch }: IReportsCommmandParams) => ({
  key: 'OPEN_FILTER_PANEL',
  iconProps: { iconName: 'Filter' },
  iconOnly: true,
  onClick: () => dispatch(TOGGLE_FILTER_PANEL())
})

/**
 * Save filter  command
 */
const saveFilterCmd = ({ state, dispatch, t }: IReportsCommmandParams): IContextualMenuItem => ({
  key: 'SAVED_FILTERS',
  text: t('reports.savedFilters'),
  subMenuProps: {
    items: [
      {
        key: 'SAVE_FILTER',
        onRender: () => <SaveFilter dispatch={dispatch} />
      },
      {
        key: 'DIVIDER_O',
        itemType: ContextualMenuItemType.Divider
      },
      ...state.savedFilters.map((filter, idx) => ({
        key: idx.toString(),
        text: filter.name,
        canCheck: true,
        checked: filter.name === state.filter?.name,
        onClick: () => dispatch(SET_FILTER({ filter }))
      }))
    ]
  }
})

export default ({ state, dispatch, t }) => ({
  items: (!!state.query && !state.loading) ? [selectGroupByCmd({ state, dispatch, t })] : [],
  farItems:
    (!!state.query && !state.loading)
      ? [
        exportToExcelCmd({ state, t }),
        saveFilterCmd({ state, dispatch, t }),
        openFilterPanelCmd({ dispatch }),
      ]
      : []
})
