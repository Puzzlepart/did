import { ILabelColumnProps } from 'components/LabelColumn/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { SummaryViewAction } from './reducer'
import { ITimeEntriesVariables } from './TIME_ENTRIES'
import { TFunction } from 'i18next'

/**
 * Get view types
 *
 * @param {TFunction} t Translate function
 */
export const getViewTypes = (t: TFunction): ISummaryViewType[] => [
  {
    key: 'resource',
    fieldName: 'resourceName',
    name: t('common.employeeLabel'),
  },
  {
    key: 'project',
    fieldName: 'project.name',
    name: t('common.project'),
  },
  {
    key: 'customer',
    fieldName: 'customer.name',
    name: t('common.customer'),
  },
]

export interface ISummaryViewProps {
  defaultYear: number
  defaultRange: number
}

export interface ISummaryViewState {
  year: number
  maxMonth: number
  timeentries: any[]
  range: number
  type: ISummaryViewType
  variables?: ITimeEntriesVariables
}

export type ISummaryViewType = IContextualMenuItem

export interface ISummaryViewContext extends ISummaryViewState {
  dispatch?: React.Dispatch<SummaryViewAction>
  types: ISummaryViewType[]
  loading?: boolean
}

export interface ISummaryViewRow extends ILabelColumnProps {
  sum: number
}
