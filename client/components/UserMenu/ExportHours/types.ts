import { TFunction } from 'i18next'
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { getQueries } from 'pages/Reports'
import { ITimeEntriesQueryVariables } from 'types/graphql'
import { filter } from 'underscore'

export interface IExportType extends IChoiceGroupOption {
  variables: ITimeEntriesQueryVariables
  exportFileName: string
}

/**
 * Get export types
 *
 * Get queries (getQueries) from pages/Reports, but omits forecast
 *
 * @param {TFunction} t Translate function
 */
export const getExportTypes = (t: TFunction): IExportType[] => {
  const queries = getQueries<IExportType>(t)
  return filter(queries, ({ key }) => key !== 'FORECAST')
}
