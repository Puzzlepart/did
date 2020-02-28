import { IProject, ITimeEntry } from 'models';
export interface IProjectColumnProps {
    event: ITimeEntry;
    isConfirmed?: boolean;
    onProjectSelected?: (project: IProject) => void;
    onProjectClear?: (evt: React.MouseEvent<any>) => void;
    onProjectIgnore?: (evt: React.MouseEvent<any>) => void;
}
