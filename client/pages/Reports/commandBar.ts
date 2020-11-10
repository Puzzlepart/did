import { IContextualMenuItem } from 'office-ui-fabric'
import { pick } from 'underscore'
import { IReportsContext } from './context'
import { getGroupByOptions } from './types'

/**
 * Select group by command
 *
 * @param {IReportsContext} context Reports context
 */
const selectGroupByCmd = (context: IReportsContext) =>
  !!context.query &&
  !context.loading && {
    key: 'SELECT_GROUP_BY',
    text: context.t('common.groupBy'),
    iconProps: { iconName: 'GroupList' },
    subMenuProps: {
      items: getGroupByOptions(context.t).map(
        (opt) =>
          ({
            ...pick(opt, 'key', 'text'),
            canCheck: true,
            checked: context.groupBy.fieldName === opt.props.fieldName,
            onClick: () => context.setState({ groupBy: opt.props })
          } as IContextualMenuItem)
      )
    }
  }

/**
 * Export to Excel command
 *
 * @param {IReportsContext} context Reports context
 */
const exportToExcelCmd = (context: IReportsContext) =>
  !!context.query &&
  !context.loading && {
    key: 'EXPORT_TO_EXCEL',
    text: context.t('reports.exportToExcel'),
    onClick: () => context.onExportExcel(),
    iconProps: { iconName: 'ExcelDocument' }
  }

/**
 * Open filter panel command
 *
 * @param {IReportsContext} context Reports context
 */
const openFilterPanel = (context: IReportsContext) =>
  !!context.query &&
  !context.loading && {
    key: 'OPEN_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    onClick: () => context.setState({ isFiltersOpen: true })
  }

/**
 * Command bar
 *
 * @param {IReportsContext} context Reports context
 */
export default (context: IReportsContext) => ({
  items: [selectGroupByCmd(context)].filter((i) => i),
  farItems: [exportToExcelCmd(context), openFilterPanel(context)].filter((i) => i)
})
