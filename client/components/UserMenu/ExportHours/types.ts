import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { ReportsQuery } from 'types'

export interface IExportType extends IChoiceGroupOption {
  variables: {
    query: ReportsQuery
  }
  exportFileName: string
}
