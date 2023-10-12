import { DateRangeType } from '@fluentui/react'
import $date from 'DateUtils'
import { IUserMessageProps } from 'components'
import { TFunction } from 'i18next'
import { ITimesheetState } from '../types'

export const weekHoursSummaryMessage = ({ selectedPeriod, dateRangeType, periods }: ITimesheetState, t: TFunction): IUserMessageProps => {
    const workHours = 8
    // eslint-disable-next-line no-console
    console.log(selectedPeriod)
    const missingHours = selectedPeriod ? ((workHours * selectedPeriod?.workDaysCount) - selectedPeriod.totalDuration + 1) : 0
    return !selectedPeriod.isConfirmed && {
        id: 'weekhourssummarymessage',
        text: t('timesheet.weekHoursSummaryText', {
            hours: $date.getDurationString(selectedPeriod.totalDuration, t),
            splitWeekInfoText:
                periods.length > 1 && dateRangeType === DateRangeType.Week
                    ? t('timesheet.splitWeekInfoText')
                    : '',
            workHoursInfoText: missingHours > 0 ? `Med ${workHours} timers arbeidsdag mangler du ${missingHours} timer denne perioden.` : 0
        })
    }
}