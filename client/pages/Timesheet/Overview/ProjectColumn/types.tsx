import { IProject, ITimeEntry } from 'interfaces'

/**
 * @category EventList
 */
export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * @category EventList
 */
export interface IProjectColumnTooltipProps {
    project: IProject;
}

/**
 * @category EventList
 */
export interface IProjectColumnProps {
    event: ITimeEntry;
}
