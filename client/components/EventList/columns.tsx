import { EntityLabel } from 'components/EntityLabel'
import DateUtils from 'DateUtils'
import * as helpers from 'helpers'
import { IColumn, Link } from 'office-ui-fabric-react'
import * as React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { EventObject, TimeEntry } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { DurationDisplay } from './DurationDisplay'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'

/**
 * Get sizing for column
 *
 * @param props - Props
 * @param Column - field name
 * @param defMinWidth - Default min width
 * @param defMaxWidth - Default max width
 */
function getSizing(
  props: IEventListProps,
  fieldName: string,
  defMinWidth: number,
  defMaxWidth: number
): { minWidth: number; maxWidth: number } {
  return {
    minWidth: helpers.getValue(props, `columnWidths.${fieldName}`, defMinWidth),
    maxWidth: helpers.getValue(props, `columnWidths.${fieldName}`, defMaxWidth)
  }
}
/**
 * Title column
 *
 * @param props - Props
 * @param name - Name
 * @param fieldName - Field name
 */
export const titleColumn = (
  props: IEventListProps,
  name: string,
  fieldName: string = 'title'
): IColumn =>
  col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 320, 400), isMultiline: true },
    (event: EventObject) => (
      <div className={styles.titleColumn}>
        <Link href={event.webLink} target='_blank' title={event.title}>
          <span>{event.title}</span>
        </Link>
        {event.labels && (
          <div className={styles.labels}>
            {event.labels.map((label, index) => (
              <EntityLabel key={index} label={label} />
            ))}
          </div>
        )}
      </div>
    )
  )

/**
 * Time column
 *
 * @param props - Props
 * @param name - Name
 * @param fieldName - Field name
 */
export const timeColumn = (
  props: IEventListProps,
  name: string,
  fieldName: string = 'time'
): IColumn =>
  col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 90, 90) },
    (event: TimeEntry) => {
      const startTime = DateUtils.formatDate(
        event.startDateTime,
        props.dateFormat
      )
      const endTime = DateUtils.formatDate(event.endDateTime, props.dateFormat)
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
        </>
      )
    }
  )

/**
 * Duration column
 *
 * @param props - Props
 * @param name - Name
 * @param fieldName - Field name
 */
export const durationColumn = (
  props: IEventListProps,
  name: string,
  fieldName: string = 'duration'
): IColumn =>
  col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 75, 75) },
    (event: TimeEntry) => (
      <BrowserView renderWithFragment={true}>
        <DurationDisplay duration={event.duration} />
      </BrowserView>
    )
  )
