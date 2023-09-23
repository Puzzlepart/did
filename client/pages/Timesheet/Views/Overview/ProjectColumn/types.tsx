import { EventObject } from 'types'

export interface IClearManualMatchButtonProps
  extends React.HTMLProps<HTMLDivElement> {
  onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export interface IProjectColumnProps {
  /**
   * The event to render the project column for.
   */
  event: EventObject

  /**
   * Whether to include the customer link in the project column.
   */
  includeCustomerLink?: boolean
}
