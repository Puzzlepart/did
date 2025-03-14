/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, IUserPickerProps } from 'components'
import { TFunction } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'

export type UseCustomQueryTabReturnType = {
  /**
   * Translation function
   */
  t: TFunction

  /**
   * Form control properties
   */
  formControl: IFormControlProps<ReportsQuery>

  /**
   * Callback to execute the report query
   */
  executeReport: () => void

  /**
   * Indicates if the query is currently loading
   */
  loading: boolean

  /**
   * Items returned from the query.
   */
  items?: any[]

  /**
   * True if the filters are collapsed
   */
  collapsed: ReturnType<typeof useBoolean>

  /**
   * True if the query has been called
   */
  isQueryCalled?: boolean

  /**
   * True if the filter criterias are valid
   */
  isFilterCriterasValid?: boolean

  /**
   * Custom action to add manager users
   */
  addManagerUsersAction?: IUserPickerProps['customAction']
}
