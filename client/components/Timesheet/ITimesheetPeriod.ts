import { ITimeEntry } from 'interfaces';

export interface ITimesheetPeriod {
  id: string;
  name: string;
  events?: ITimeEntry[];
  totalDuration?: number;
  confirmedDuration?: number;
  isConfirmed?: boolean;
}
