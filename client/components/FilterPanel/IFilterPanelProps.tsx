import { IPanelProps } from 'office-ui-fabric'
import { BaseFilter, IFilter } from './Filters'

export interface IFilterPanelProps extends IPanelProps {
  filters: BaseFilter[]
  entries: any[]
  onFilterUpdated: (filters: IFilter[]) => void
}
