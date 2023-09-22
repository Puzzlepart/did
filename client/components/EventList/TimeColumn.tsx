import $date from 'DateUtils'
import React, { FC } from 'react'
import { MobileView } from 'react-device-detect'
import { TimeEntry } from 'types'
import { DurationDisplay } from './DurationDisplay'

export const TimeColumn: FC<{ event: TimeEntry; dateFormat: string }> = ({
  event,
  dateFormat
}) => {
  const startTime = $date.formatDate(event.startDateTime, dateFormat)
  const endTime = $date.formatDate(event.endDateTime, dateFormat)
  return (
    <>
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
    </>
  )
}
