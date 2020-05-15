import { ICustomer } from './ICustomer';
import { IProject } from './IProject';

/**
 * @category Common
 */
export interface ITimeEntry {
    id: string;
    key: string;
    title: string;
    isOrganizer: boolean;
    project: IProject;
    suggestedProject: IProject;
    customer: ICustomer;
    projectKey: string;
    customerKey: string;
    webLink: string;
    duration: number;
    startTime: string;
    endTime: string;
    day: string;
    isManualMatch?: boolean;
    isIgnored?: boolean;
    error?: Error;
}