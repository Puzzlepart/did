import $date from 'DateUtils'
import React from 'react'
import { MobileView } from 'react-device-detect'
import { StyledComponent } from 'types'
import { DurationDisplay } from '../DurationDisplay'
import { ITimeColumnProps } from './types'

export const TimeColumn: StyledComponent<ITimeColumnProps> = (props) => {
  const startTime = $date.formatDate(
    props.event.startDateTime,
    props.dateFormat
  )
  const endTime = $date.formatDate(props.event.endDateTime, props.dateFormat)
  return (
    <div className={props.className}>
      <span>
        {startTime} - {endTime}
      </span>
      <MobileView renderWithFragment={true}>
        <DurationDisplay
          {...props}
          displayFormat='({0})'
          style={{ marginLeft: 4 }}
        />
      </MobileView>
    </div>
  )
}
