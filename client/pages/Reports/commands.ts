import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { pick } from 'underscore'
import { getGroupByOptions, getQueries, IReportsQuery } from './types'

/**
 * Select query command
 *
 * @param {IReportsQuery} selectedQuery Selected query
 * @param {React.Dispatch<React.SetStateAction<IReportsQuery>>} setQuery Set query dispatch
 * @param {TFunction} t Translate function
 */
export const selectQuery = (
  selectedQuery: IReportsQuery,
  setQuery: React.Dispatch<React.SetStateAction<IReportsQuery>>,
  t: TFunction
) => {
  const queries = getQueries(t)
  return {
    key: 'SELECT_QUERY',
    text: selectedQuery?.text || t('reports.selectReportLabel'),
    iconProps: { iconName: selectedQuery?.iconName || 'ReportDocument' },
    subMenuProps: {
      items: queries.map(query => ({
        ...pick(query, 'key', 'text'),
        iconProps: { iconName: query.iconName },
        canCheck: true,
        checked: selectedQuery?.key === query.key,
        onClick: () => setQuery(query),
      })),
    },
  }
}

/**
 * Select group by command
 *
 * @param {IListGroups} selectedGroupBy Selected group by
 * @param {React.Dispatch<React.SetStateAction<IListGroups>>} setGroupBy Set group by dispatch
 * @param {TFunction} t Translate function
 */
export const selectGroupBy = (
  selectedGroupBy: IListGroups,
  setGroupBy: React.Dispatch<React.SetStateAction<IListGroups>>,
  t: TFunction
) => {
  const groupByOptions = getGroupByOptions(t)
  return {
    key: 'SELECT_GROUP_BY',
    text: t('common.groupBy'),
    iconProps: { iconName: 'GroupList' },
    subMenuProps: {
      items: groupByOptions.map(
        opt =>
          ({
            ...pick(opt, 'key', 'text'),
            canCheck: true,
            checked: selectedGroupBy.fieldName === opt.props.fieldName,
            onClick: () => setGroupBy(opt.props),
          } as IContextualMenuItem)
      ),
    },
  }
}

/**
 * Export to Excel command
 *
 * @param {void} onClick On click callback
 * @param {TFunction} t Translate function
 */
export const exportToExcel = (onClick: () => void, t: TFunction) => {
  return {
    key: 'EXPORT_TO_EXCEL',
    text: t('common.exportCurrentView'),
    onClick,
    iconProps: { iconName: 'ExcelDocument' },
  }
}

/**
 * Open filter panel command
 *
 * @param {void} onClick On click callback
 */
export const openFilterPanel = (onClick: (bool: boolean) => void) => {
  return {
    key: 'OPEN_FILTER_PANEL',
    iconProps: { iconName: 'Filter' },
    iconOnly: true,
    onClick: () => onClick(true),
  }
}
