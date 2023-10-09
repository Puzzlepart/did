/* eslint-disable unicorn/prevent-abbreviations */
import { useContext } from 'react'
import { ReportsContext } from '../context'
import { useReportsQueryPreset } from '../hooks'
import { IReportLinksProps } from './types'

/**
 * Custom hook that returns an object containing an array of report links based on the query preset parameter.
 * 
 * @param props - The props for the `ReportLinks` component.
 */
export function useReportLinks(props:IReportLinksProps) {
  const context = useContext(ReportsContext)
  const queryPreset = useReportsQueryPreset()
  if(props.promoted) {
    return { reportLinks: context.state.data.reportLinks.filter(({ promoted }) => promoted) }
  }
  if (!queryPreset) {
    return { reportLinks: [] }
  }
  const reportLinks = context.state.data.reportLinks.filter(({ linkRef }) => linkRef === queryPreset.reportLinkRef)
  return { reportLinks }
}
