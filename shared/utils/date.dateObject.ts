import {Dayjs, OpUnitType} from 'dayjs';
import {isEmpty, pick} from 'underscore';
import DateUtils, {$dayjs, DateInput} from './date';

export type ObjectInput = {
	week: number | string;
	year: number | string;
};

export class DateObject {
	/**
	 * Using $ as we don't really care if it's dayjs, Temporal or luxon. This class should be
	 * framework-agnostic, or maybe even framework-atheist
	 */
	public $: Dayjs;

	/**
	 * Constructs a new DateObject from a date input
	 *
	 * Sending no value for date will use the current date
	 *
	 * @param date Date input
	 */
	constructor(date?: DateInput) {
		this.$ = $dayjs(date);
	}

	/**
	 * Sets the DateObject date from an object consisting of week and year
	 *
	 * If @week and @year is not specified, today's date is used
	 *
	 * @param input Object input
	 * @param startOf Optional start of (e.g. year or isoWeek)
	 */
	public fromObject(input: ObjectInput, startOf: any = 'isoWeek'): DateObject {
		const year =
			typeof input.year === 'string' ? Number.parseInt(input.year) : input.year;
		const isoWeek =
			typeof input.week === 'string' ? Number.parseInt(input.week) : input.week;
		this.$ = $dayjs().year(year).isoWeek(DateUtils.getIsoWeek(isoWeek, year));
		if (startOf) {
			this.$ = this.$.startOf('isoWeek');
		}

		return this;
	}

	/**
	 * To get a copy of the native Date object parsed from the Day.js object use dayjs#toDate
	 */
	public get jsDate() {
		return this.$.toDate();
	}

	/**
	 * Get end of week
	 */
	public get endOfWeek() {
		return DateUtils.endOfWeek(this);
	}

	/**
	 * Get start of week
	 */
	public get startOfWeek() {
		return DateUtils.startOfWeek(this);
	}

	/**
	 * Get end of month
	 */
	public get endOfMonth() {
		return DateUtils.endOfMonth(this);
	}

	/**
	 * Get start of month
	 */
	public get startOfMonth() {
		return DateUtils.startOfMonth(this);
	}

	/**
	 * Is current week
	 */
	public get isCurrentWeek() {
		return DateUtils.isCurrentWeek(this);
	}

	/**
	 * Get the formatted date according to the string of tokens passed in.
	 *
	 * To escape characters, wrap them in square brackets (e.g. [MM]).
	 *
	 * @param Template
	 * @param Locale
	 */
	public format(template = 'YYYY-MM-DD', locale?: string): string {
		return DateUtils.formatDate(this.$, template, locale);
	}

	/**
	 * This indicates whether the DateObject object is the same month the other supplied date-time.
	 *
	 * @param date Date
	 */
	isSameMonth(date: DateObject) {
		return this.$.isSame(date.$, 'month');
	}

	/**
	 * This indicates whether the DateObject object is the same year the other supplied date-time.
	 *
	 * @param date Date
	 */
	isSameYear(date: DateObject) {
		return this.$.isSame(date.$, 'year');
	}

	/**
	 * Is after today
	 */
	public isAfterToday() {
		return DateUtils.isAfterToday(this.$);
	}

	/**
	 * This indicates whether the Day.js object is the same or before as the other supplied date-time.
	 *
	 * @param date Date
	 */
	isBeforeOrSame(date: DateObject) {
		return this.$.isBefore(date.$) || this.$.isSame(date.$);
	}

	/**
	 * Returns a cloned DateObject with a specified amount of time added
	 *
	 * Currently only supporting int (whole numbers)
	 *
	 * If we want to support e.g. 1.5h, we could look into using parseFloat insteaf of parseInt
	 *
	 * E.g. 1d to add day, or 1m to add 1 month
	 *
	 * @param Add
	 */
	public add(add: string) {
		const value = Number.parseInt(add);
		const [, unit] = add.split(value.toString());
		return new DateObject(this.$.add(value, unit as OpUnitType));
	}

	/**
	 * This indicates the difference between two date-time in the specified unit.
	 *
	 * @param date Date   *
	 * @param unit Unit
	 */
	diff(date: DateObject, unit: OpUnitType) {
		return this.$.diff(date.$, unit);
	}

	/**
	 * Returns an object representation of the DateObject
	 *
	 * @param[]} include Properties to include
	 */
	toObject(...include: string[]) {
		const object = {
			week: DateUtils.getWeek(this.$),
			month: DateUtils.getMonthIndex(this.$),
			year: DateUtils.getYear(this.$),
			monthName: this.format('MMMM')
		};
		return isEmpty(include) ? object : pick(object, ...include);
	}
}
