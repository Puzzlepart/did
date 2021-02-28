import DateUtils from 'DateUtils';
import {useTranslation} from 'react-i18next';
import {filter} from 'underscore';
import {getSum} from 'utils/getSum';

/**
 * Use summary hook
 *
 * @param timeentries - Time entries
 */
export function useSummary(timeentries: any[]) {
	const {t} = useTranslation();
	return [
		{
			label: t('common.hoursCurrentMonth'),
			value: DateUtils.getDurationString(
				getSum(
					filter(
						timeentries,
						entry =>
							entry.month === new Date().getMonth() + 1 &&
							entry.year === new Date().getFullYear()
					),
					'duration'
				),
				t
			)
		},
		{
			label: t('common.hoursPrevMonth'),
			value: DateUtils.getDurationString(
				getSum(
					filter(
						timeentries,
						entry =>
							entry.month === new Date().getMonth() &&
							entry.year === new Date().getFullYear()
					),
					'duration'
				),
				t
			)
		},
		{
			label: t('common.hoursCurrentYear'),
			value: DateUtils.getDurationString(
				getSum(
					filter(
						timeentries,
						entry => entry.year === new Date().getFullYear()
					),
					'duration'
				),
				t
			)
		},
		{
			label: t('common.totalHours'),
			value: DateUtils.getDurationString(getSum(timeentries, 'duration'), t)
		}
	];
}
