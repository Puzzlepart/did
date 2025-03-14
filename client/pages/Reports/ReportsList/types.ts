import { IListProps, ITabProps } from 'components'

export interface IReportsListProps
  extends ITabProps,
    Partial<Pick<IListProps, 'items'>> {
  /**
   * Loading state. If true, a progress bar will be displayed
   * with this as the label.
   */
  loading?: string

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
