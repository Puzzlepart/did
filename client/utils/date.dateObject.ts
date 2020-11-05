import dayjs from 'dayjs'
import { DateUtils, DateInput } from './date'

export class DateObject {
    public _: dayjs.Dayjs;
    public jsDate: Date
    public endOfWeek: DateInput
  public isCurrentWeek: boolean;

    constructor(date: DateInput, dateUtils: DateUtils) {
        this._ = dayjs(date)
        this.jsDate = this._.toDate()
        this.endOfWeek = dateUtils.endOfWeek(date)
        this.isCurrentWeek = dateUtils.isCurrentWeek(date)
    }
}
