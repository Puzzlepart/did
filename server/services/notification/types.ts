import format from 'string-format';

/**
 * Used as a base to create notifications to the user
 */
export class UserNotification {
	/**
	 * Notification ID
	 */
	public id: string;

	/**
	 * Notification text
	 */
	public text: string;

	constructor(
		id: string,
		public type: number,
		public severity: number,
		private readonly _period: any,
		template: string
	) {
		this.id = this._generateId(id);
		this.text = format(template, _period.week, _period.month);
	}

	/**
	 * Generate notification id
	 *
	 * @param id - Id
	 */
	private _generateId(id: string) {
		return id.replace(/[^a-zA-Z\d]/g, '');
	}

	/**
	 * More link
	 *
	 * @remarks This could be handled on the client in the future
	 */
	public get moreLink() {
		return ['', 'timesheet/overview', ...this._period.id.split('_')].join('/');
	}
}

/**
 * @ignore
 */
export class ForecastNotification extends UserNotification {
	constructor(period: any, template: string) {
		super(`forecast${period.id}`, 1, 2, period, template);
	}
}

/**
 * @ignore
 */
export class UnconfirmedPeriodNotification extends UserNotification {
	constructor(period: any, template: string) {
		super(`unconfirmedperiod${period.id}`, 0, 2, period, template);
	}
}
