import { EventObject, Project } from 'types'

export interface IClearManualMatchButtonProps
  extends React.HTMLProps<HTMLDivElement> {
  onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export interface IProjectColumnTooltipProps {
  project: Project
}

export interface IProjectColumnProps {
  event: EventObject
}
