/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import DateUtils from 'DateUtils'
import React, { FunctionComponent } from 'react'
import { MobileView } from 'react-device-detect'
import { DurationDisplay } from './DurationDisplay'
import { ITimeColumnProps } from './types'
import { VisualGap } from './VisualGap'

/**
 * @category Function Component
 */
export const TimeColumn: FunctionComponent<ITimeColumnProps> = ({
  event,
  index,
  listProps
}: ITimeColumnProps) => {
  const startTime = DateUtils.formatDate(
    event.startDateTime,
    listProps.dateFormat
  )
  const endTime = DateUtils.formatDate(event.endDateTime, listProps.dateFormat)
  return (
    <>
      <span>
        {startTime} - {endTime}
      </span>
      <MobileView renderWithFragment={true}>
        <DurationDisplay
          displayFormat='({0})'
          duration={event.duration}
          style={{ marginLeft: 4 }}
        />
      </MobileView>
      <VisualGap
        from={event.endDateTime}
        to={listProps.events[index + 1]?.startDateTime}
      />
    </>
  )
}
