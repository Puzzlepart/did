import { TFunction } from 'i18next'
import { createContext } from 'react'
import { IReportsState } from './types'

export interface IReportsContext extends IReportsState {
  /**
   * Loading data
   */
  loading: boolean

  /**
   * Time entries
   */
  timeentries: any[]

  /**
   * Set state for the Reports component
   */
  setState: (state: IReportsState) => void

  /**
   * On export to Excel callback
   */
  onExportExcel: () => void

  /**
   * Translate function
   */
  t: TFunction
}

export const ReportsContext = createContext(null)
