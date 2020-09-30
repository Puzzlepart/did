import { IProject, ITimeEntry } from 'interfaces'

/**
 * @category Timesheet
 */
export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * @category Timesheet
 */
export interface IIgnoreEventButtonProps {
    event: ITimeEntry;
}

/**
 * @category Timesheet
 */
export interface IProjectColumnTooltipProps {
    project: IProject;
}

/**
 * @category Timesheet
 */
export interface IProjectColumnProps {
    event: ITimeEntry;
}
