/* eslint-disable unicorn/prevent-abbreviations */
import { useContext } from 'react'
import { ReportsContext } from '../context'
import { IReportLinksProps } from './types'

/**
 * Custom hook that returns an object containing an array of report links based on the query preset parameter.
 *
 * @param props - The props for the `ReportLinks` component.
 */
export function useReportLinks(props: IReportLinksProps) {
  const context = useContext(ReportsContext)
  if (props.promoted) {
    return {
      reportLinks: context.state.data.reportLinks.filter(
        ({ promoted }) => promoted
      )
    }
  }
  if (!context.queryPreset) {
    return { reportLinks: [] }
  }
  const reportLinks = context.state.data.reportLinks.filter(
    ({ linkRef }) => linkRef === context.queryPreset.reportLinkRef
  )
  return { reportLinks }
}
