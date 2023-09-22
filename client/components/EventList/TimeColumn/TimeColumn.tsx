import $date from 'DateUtils'
import React from 'react'
import { MobileView } from 'react-device-detect'
import { StyledComponent } from 'types'
import { DurationDisplay } from '../DurationDisplay'
import { ITimeColumnProps } from './types'

export const TimeColumn: StyledComponent<ITimeColumnProps> = ({ event, dateFormat }) => {
    const startTime = $date.formatDate(event.startDateTime, dateFormat)
    const endTime = $date.formatDate(event.endDateTime, dateFormat)
    return (
        <div>
            <span>
                {startTime} - {endTime}
            </span>
            <MobileView renderWithFragment={true}>
                <DurationDisplay
                    displayFormat='({0})'
                    event={event}
                    style={{ marginLeft: 4 }}
                />
            </MobileView>
        </div>
    )
}