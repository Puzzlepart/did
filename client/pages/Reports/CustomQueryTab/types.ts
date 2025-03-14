/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, IUserPickerProps } from 'components'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'

export type UseCustomQueryTabReturnType = {
  /**
   * Form control properties
   */
  formControl: IFormControlProps<ReportsQuery>

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
   * Custom action to add manager users
   */
  addManagerUsersAction?: IUserPickerProps['customAction']

  /**
   * Checks if the given key is disabled.
   *
   * @param key - The key to check if it is disabled
   */
  isDisabled?(key: keyof ReportsQuery): { disabled: boolean; title: string }

  /**
   * Error object returned from the query.
   */
  error?: Error
}
