import { ITypedHash } from '@pnp/common';
import { IProject, ICustomer } from 'interfaces';

/**
 * @category UserAllocation
 */
export interface IUserAllocationChart {
    column: string;
    title: string;
}

/**
 * @category UserAllocation
 */
export interface IUserAllocationProps {
    entries?: ITimeEntry[];
    resourceId?: string;
    currentUser?: boolean;
    weekNumber?: number;
    yearNumber?: number;
    charts: ITypedHash<string>;
}

/**
 * @category UserAllocation
 */
export interface ITimeEntry {
  durationHours: number;
  project: IProject;
  customer: ICustomer;
}