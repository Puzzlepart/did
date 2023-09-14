/* eslint-disable unicorn/prevent-abbreviations */
import { IColumn } from '@fluentui/react'
import { Link } from '@fluentui/react-components'
import { EntityLabel } from 'components/EntityLabel'
import $date from 'DateUtils'
import get from 'get-value'
import React, { useMemo } from 'react'
import { isBrowser, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject, TimeEntry } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { DurationDisplay } from './DurationDisplay'
import styles from './EventList.module.scss'
import { IEventListProps } from './types'

/**
 * Get sizing for column
 *
 * @param props - Props
 * @param fieldName - Field name
 * @param defaultMinWidth - Default min width
 * @param defaultMaxWidth - Default max width
 */
function getSizing(
  props: IEventListProps,
  fieldName: string,
  defaultMinWidth: number,
  defaultMaxWidth: number
): { minWidth: number; maxWidth: number } {
  return {
    minWidth: get(props, `columnWidths.${fieldName}`, {
      default: defaultMinWidth
    }),
    maxWidth: get(props, `columnWidths.${fieldName}`, {
      default: defaultMaxWidth
    })
  }
}
/**
 * Title column
 *
 * @param props - Props
 * @param name - Name
 */
const createTitleColumnDef = (props: IEventListProps, name: string): IColumn =>
  createColumnDef(
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
const createTimeColumnDef = (props: IEventListProps, name: string): IColumn =>
  createColumnDef(
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
              event={event}
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
const createDurationColumnDefs = (
  props: IEventListProps,
  name: string
): IColumn =>
  createColumnDef(
    'duration',
    name,
    { ...getSizing(props, 'duration', 75, 75) },
    (event: TimeEntry) => <DurationDisplay event={event} />
  )

export function useColumns(props: IEventListProps) {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        createTitleColumnDef(props, t('common.titleLabel')),
        createTimeColumnDef(props, t('common.timeLabel')),
        isBrowser && createDurationColumnDefs(props, t('common.durationLabel')),
        ...props.additionalColumns
      ]
        .filter((col) => !!col)
        .map((col) => ({
          ...col,
          isResizable: props.resizableColumns
        })),
    [props.additionalColumns]
  )
}
