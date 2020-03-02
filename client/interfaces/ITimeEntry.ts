import { IProject } from './IProject';
import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';
import { ICustomer } from './ICustomer';

export interface ITimeEntry extends IObjectWithKey {
    id: string;
    title: string;
    isOrganizer: boolean;
    project: IProject;
    suggestedProject: IProject;
    customer: ICustomer;
    projectKey: string;
    customerKey: string;
    webLink: string;
    durationMinutes: number;
    durationHours: number;
    startTime: string;
    endTime: string;
    day: string;
    isManualMatch?: boolean;
    isIgnored?: boolean;
    error?: Error;
}