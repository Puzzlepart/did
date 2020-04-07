import { ITypedHash } from '@pnp/common';
import { IProject, ICustomer } from 'interfaces';

export interface IUserAllocationChart {
    column: string;
    title: string;
}

export interface IUserAllocationProps {
    entries?: ITimeEntry[];
    resourceId?: string;
    currentUser?: boolean;
    weekNumber?: number;
    yearNumber?: number;
    charts: ITypedHash<string>;
}


export interface ITimeEntry {
  durationHours: number;
  project: IProject;
  customer: ICustomer;
}