import { ITimeEntry } from 'interfaces';

export interface ITimesheetData {
  events?: ITimeEntry[];
  totalDuration?: number;
  confirmedDuration?: number;
}
