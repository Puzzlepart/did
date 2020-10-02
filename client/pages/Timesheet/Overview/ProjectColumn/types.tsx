import { IProject, ITimeEntry } from 'types'

export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}


export interface IIgnoreEventButton {
    event: ITimeEntry;
}


export interface IProjectColumnTooltipProps {
    project: IProject;
}

export interface IProjectColumnProps {
    event: ITimeEntry;
}
