import {IUserMessageProps} from 'components/UserMessage/types';
import DateUtils from 'DateUtils';
import {MessageBarType} from 'office-ui-fabric-react';
import {CLEAR_IGNORES} from 'pages/Timesheet/reducer/actions';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {isEmpty} from 'underscore';
import {TimesheetContext} from '../context';

/**
 * Use messages
 */
export function useMessages() {
	const {t} = useTranslation();
	const {selectedPeriod, periods, dispatch} = useContext(TimesheetContext);

	const messages: IUserMessageProps[] = [];

	if (selectedPeriod) {
		if (!selectedPeriod.isConfirmed) {
			messages.push({
				text: t('timesheet.periodHoursSummaryText', {
					hours: DateUtils.getDurationString(selectedPeriod.totalDuration, t)
				}),
				iconName: 'ReminderTime'
			});
		}

		if (!selectedPeriod.isComplete && !selectedPeriod.isForecast) {
			messages.push({
				text: t('timesheet.hoursNotMatchedText', {
					hours: DateUtils.getDurationString(
						selectedPeriod.unmatchedDuration,
						t
					)
				}),
				type: MessageBarType.warning,
				iconName: 'BufferTimeBoth'
			});
		}

		if (selectedPeriod.isComplete && !selectedPeriod.isConfirmed) {
			messages.push({
				text: t('timesheet.allHoursMatchedText'),
				type: MessageBarType.success,
				iconName: 'BufferTimeBoth'
			});
		}

		if (selectedPeriod.isConfirmed) {
			messages.push({
				text: t('timesheet.periodConfirmedText', {
					hours: DateUtils.getDurationString(selectedPeriod.matchedDuration, t)
				}),
				type: MessageBarType.success,
				iconName: 'CheckMark'
			});
		}

		if (selectedPeriod.isForecasted && !selectedPeriod.isConfirmed) {
			messages.push({
				text: t('timesheet.periodForecastedText', {
					hours: DateUtils.getDurationString(selectedPeriod.forecastedHours, t)
				}),
				type: MessageBarType.info,
				iconName: 'BufferTimeBoth'
			});
		}

		if (!isEmpty(selectedPeriod.ignoredEvents) && !selectedPeriod.isConfirmed) {
			messages.push({
				children: (
					<p>
						<span>
							{t('timesheet.ignoredEventsText', {
								ignored_count: selectedPeriod.ignoredEvents.length
							})}
						</span>
						<a
							href="#"
							onClick={() => {
								dispatch(CLEAR_IGNORES());
							}}
						>
							{t('timesheet.undoIgnoreText')}
						</a>
					</p>
				),
				type: MessageBarType.warning,
				iconName: 'DependencyRemove'
			});
		}

		if (!isEmpty(selectedPeriod.errors)) {
			messages.push({
				type: MessageBarType.severeWarning,
				text: t('timesheet.unresolvedErrorText', {
					count: selectedPeriod.errors.length
				}),
				iconName: 'ErrorBadge'
			});
		}

		if (periods.length > 1) {
			messages.push({
				text: t('timesheet.splitWeekInfoText'),
				iconName: 'SplitObject'
			});
		}
	}

	return messages;
}
