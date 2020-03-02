import { IProject, ITimeEntry } from 'interfaces';
export interface IProjectColumnProps {
    event: ITimeEntry;
    isConfirmed?: boolean;
    onProjectSelected?: (project: IProject) => void;
    onProjectClear?: (evt: React.MouseEvent<any>) => void;
    onProjectIgnore?: (evt: React.MouseEvent<any>) => void;
}
