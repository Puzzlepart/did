import {
  IIconProps
} from '@fluentui/react'
import { ButtonProps } from '@fluentui/react-components'
import { AnyAction } from '@reduxjs/toolkit'
import { useReportsContext } from '../context'
import { CHANGE_QUERY } from '../reducer/actions'
import { IReportsState } from '../types'
import { useReportsQueries } from './useReportsQueries'

/**
 * Options for the useReportsQuery hook.
 */
export type UseReportsQueryOptions = {
  /**
   * The queries returned by the useReportsQueries hook.
   */
  queries: ReturnType<typeof useReportsQueries>

  /**
   * The current state of the reports.
   */
  state: IReportsState

  /**
   * The dispatch function for updating the state of the reports.
   */
  dispatch: React.Dispatch<AnyAction>
}

export interface ReportsQueryButton
  extends Pick<ButtonProps, 'onClick'> {
  text: string
  title?: string
  iconProps?: IIconProps
}

/**
 * Returns queries from `useReportsQueries` as `ReportsQueryButton` objects.
 *
 * @category Reports
 */
export function useReportsQueryButtons(): ReportsQueryButton[] {
  const { state, queries, dispatch } = useReportsContext()
  const promotedReportLinks = state.reportLinks?.filter((l) => l.promoted) ?? []
  return [
    ...queries.map<ReportsQueryButton>(
      ({ id, text, icon }) =>
      ({
        text,
        iconProps: { iconName: icon },
        onClick: () => dispatch(CHANGE_QUERY({ id }))
      } as ReportsQueryButton)
    ),
    ...promotedReportLinks.map<ReportsQueryButton>(
      (link) =>
      ({
        text: link.name,
        title: link.description,
        iconProps: {
          iconName: link.icon,
          styles: { root: { color: link.iconColor } }
        },
        onClick: () => window.open(link.externalUrl, '_blank')
      } as ReportsQueryButton)
    )
  ]
}
