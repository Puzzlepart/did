import {
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles,
  IIconProps,
  IStyleFunctionOrObject
} from '@fluentui/react'
import { ButtonProps } from '@fluentui/react-components'
import { AnyAction } from '@reduxjs/toolkit'
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

export interface ReportsQueryButton extends Pick<ButtonProps, 'title' | 'onClick'> {
  text: string
  iconProps?: IIconProps
}

/**
 * Returns queries from `useReportsQueries` as `ReportsQueryButton` objects.
 *
 * @category Reports
 */
export function useReportsQueryButtons({
  queries,
  state,
  dispatch
}: UseReportsQueryOptions): ReportsQueryButton[] {
  const promotedReportLinks = state.reportLinks?.filter((l) => l.promoted) ?? []
  const styles: IStyleFunctionOrObject<
    IChoiceGroupOptionStyleProps,
    IChoiceGroupOptionStyles
  > = {
    root: {
      padding: 25,
      maxWidth: 180
    },
    labelWrapper: {
      maxWidth: 'none'
    },
    field: {
      border: 'none',
      ':before': {
        display: 'none'
      }
    }
  }
  return [
    ...queries.map<ReportsQueryButton>(({ itemKey, headerText, itemIcon }) => ({
      text: headerText,
      iconProps: { iconName: itemIcon },
      onClick: () => dispatch(CHANGE_QUERY({ itemKey })),
      styles
    } as ReportsQueryButton)),
    ...promotedReportLinks.map<ReportsQueryButton>((link) => ({
      text: link.name,
      title: link.description,
      iconProps: {
        iconName: link.icon,
        styles: { root: { color: link.iconColor } }
      },
      onClick: () => window.open(link.externalUrl, '_blank'),
    } as ReportsQueryButton))
  ]
}
