import { HTMLProps } from 'react'

export interface IReportLinksProps
  extends Pick<HTMLProps<HTMLDivElement>, 'className'> {
  /**
   * Show all promoted links.
   */
  promoted?: boolean
}
