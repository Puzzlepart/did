import EventList from 'components/EventList';
import { getDurationDisplay } from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces/ITimeEntry';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { TimesheetContext } from '../';
import ProjectColumn from '../ProjectColumn';
import { StatusBar } from '../StatusBar';
import { IOverviewProps } from './types';

/**
 * @category Timesheet
 */
export const Overview = ({ dayFormat, timeFormat }: IOverviewProps) => {
    const {
        loading,
        selectedPeriod,
        periods,
        scope,
    } = React.useContext(TimesheetContext);
    return (
        <>
            <StatusBar />
            {loading && <ProgressIndicator {...loading} />}
            <EventList
                enableShimmer={!!loading}
                events={selectedPeriod.events}
                showEmptyDays={periods.length === 1}
                dateFormat={timeFormat}
                groups={{
                    fieldName: 'date',
                    groupNames: scope.weekdays(dayFormat),
                    totalFunc: (items: ITimeEntry[]) => {
                        const totalMins = items.reduce((sum, i) => sum = i.durationMinutes, 0);
                        return ` (${getDurationDisplay(totalMins)})`;
                    },
                }}
                additionalColumns={[
                    col(
                        'project',
                        resource('COMMON.PROJECT'),
                        { minWidth: 350, maxWidth: 350 },
                        (event: ITimeEntry) => <ProjectColumn event={event} />
                    ),
                ]} />
        </>
    )
}