import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { pick } from 'underscore'
import { IReportsContext } from './context'
import { getGroupByOptions } from './types'

// /**
//  * Select query command
//  *
//  * @param {IReportsContext} context Reports context
//  */
// const selectQueryCmd = (context: IReportsContext) => ({
//   key: 'SELECT_QUERY',
//   text: context.query?.text || context.t('reports.selectReportLabel'),
//   iconProps: { iconName: context.query?.iconName || 'ReportDocument' },
//   subMenuProps: {
//     items: getQueries(context.t).map(query => ({
//       ...pick(query, 'key', 'text'),
//       iconProps: { iconName: query.iconName },
//       canCheck: true,
//       checked: context.query?.key === query.key,
//       onClick: () => context.setState({ query }),
//     })),
//   },
// })

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
        opt =>
          ({
            ...pick(opt, 'key', 'text'),
            canCheck: true,
            checked: context.groupBy.fieldName === opt.props.fieldName,
            onClick: () => context.setState({ groupBy: opt.props }),
          } as IContextualMenuItem)
      ),
    },
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
    text: context.t('common.exportCurrentView'),
    onClick: () => context.onExportExcel(),
    iconProps: { iconName: 'ExcelDocument' },
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
    onClick: () => context.setState({ isFiltersOpen: true }),
  }

/**
 * Command bar
 *
 * @param {IReportsContext} context Reports context
 */
export default (context: IReportsContext) => ({
  items: [selectGroupByCmd(context)].filter(i => i),
  farItems: [exportToExcelCmd(context), openFilterPanel(context)].filter(i => i),
})
