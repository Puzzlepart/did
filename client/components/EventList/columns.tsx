/* eslint-disable react-hooks/exhaustive-deps */
import { EntityLabel } from 'components/EntityLabel'
import * as helpers from 'helpers'
import { IColumn, Link } from 'office-ui-fabric-react'
import React, { useMemo } from 'react'
import { BrowserView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject, TimeEntry } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import styles from './EventList.module.scss'
import { TimeColumn } from './TimeColumn'
import { DurationDisplay } from './TimeColumn/DurationDisplay'
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
    (event: TimeEntry, index: number) => (
      <TimeColumn listProps={props} event={event} index={index} />
    )
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
    (event: TimeEntry) => (
      <BrowserView renderWithFragment={true}>
        <DurationDisplay duration={event.duration} />
      </BrowserView>
    )
  )

export function useColumns(props: IEventListProps) {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        titleColumn(props, t('common.titleLabel')),
        timeColumn(props, t('common.timeLabel')),
        durationColumn(props, t('common.durationLabel')),
        ...props.additionalColumns
      ].map((col) => ({
        ...col,
        isResizable: props.resizableColumns
      })),
    [props.events]
  )
}
