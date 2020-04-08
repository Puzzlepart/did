import { ITimeEntry } from 'interfaces';

export interface ITimesheetPeriod {
  id: string;
  name: string;  
  startDateTime?: string;
  endDateTime?: string;
  events?: ITimeEntry[];
  totalDuration?: number;
  confirmedDuration?: number;
  isConfirmed?: boolean;
  errors?: Error[];
}
