import { EntityLabel } from 'components/EntityLabel'
import $date from 'DateUtils'
import * as helpers from 'helpers'
import { IColumn, Link } from '@fluentui/react'
import React, { useMemo } from 'react'
import { isBrowser, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
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
 */
const titleColumn = (props: IEventListProps, name: string): IColumn =>
  col(
    'title',
    name,
    { ...getSizing(props, 'title', 320, 400), isMultiline: true },
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
 */
const timeColumn = (props: IEventListProps, name: string): IColumn =>
  col(
    'time',
    name,
    { ...getSizing(props, 'time', 90, 90) },
    (event: TimeEntry) => {
      const startTime = $date.formatDate(event.startDateTime, props.dateFormat)
      const endTime = $date.formatDate(event.endDateTime, props.dateFormat)
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
 */
const durationColumn = (props: IEventListProps, name: string): IColumn =>
  col(
    'duration',
    name,
    { ...getSizing(props, 'duration', 75, 75) },
    (event: TimeEntry) => <DurationDisplay duration={event.duration} />
  )

export function useColumns(props: IEventListProps) {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        titleColumn(props, t('common.titleLabel')),
        timeColumn(props, t('common.timeLabel')),
        isBrowser && durationColumn(props, t('common.durationLabel')),
        ...props.additionalColumns
      ]
        .filter((col) => !!col)
        .map((col) => ({
          ...col,
          isResizable: props.resizableColumns
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.additionalColumns]
  )
}
