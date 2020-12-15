import { format, IContextualMenuItem } from 'office-ui-fabric'
import { pick } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import getColumns from './columns'
import { SET_GROUP_BY, TOGGLE_FILTER_PANEL } from './reducer'
import { getGroupByOptions } from './types'

/**
 * Select group by command
 */
const selectGroupByCmd = ({ state, dispatch, t }) =>
  !!state.query &&
  !state.loading && {
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
  }

/**
 * Export to Excel command
 */
const exportToExcelCmd = ({ state, t }) =>
  !!state.query &&
  !state.loading && {
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
  }

/**
 * Open filter panel command
 */
const openFilterPanel = ({ state, dispatch }) =>
  !!state.query &&
  !state.loading && {
    key: 'OPEN_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    onClick: () => dispatch(TOGGLE_FILTER_PANEL())
  }

/**
 * Command bar
 */
export default ({ state, dispatch, t }) => ({
  items: [selectGroupByCmd({ state, dispatch, t })].filter((i) => i),
  farItems: [exportToExcelCmd({ state, t }), openFilterPanel({ state, dispatch })].filter((i) => i)
})
