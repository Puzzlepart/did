import { IListProps, ITabProps } from 'components'

export interface IReportsListProps
  extends ITabProps,
    Partial<Pick<IListProps, 'items'>> {
  /**
   * Flag indicating whether or not the component is loading.
   */
  loading?: boolean
  /**
   * Flag indicating whether or not to display the filters.
   */
  filters?: boolean

  /**
   * Flag indicating whether or not to display the search box.
   */
  search?: boolean

  /**
   * Default export file name if no query preset is selected.
   */
  exportFileName?: string
}
