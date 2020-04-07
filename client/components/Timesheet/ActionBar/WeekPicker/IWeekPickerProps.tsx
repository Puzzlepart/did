import { ITimesheetView } from '../../ITimesheetView';

export interface IWeekPickerProps {
    view: ITimesheetView;
    onChange: (view: ITimesheetView) => void;
}
