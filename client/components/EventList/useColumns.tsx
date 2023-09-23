/* eslint-disable unicorn/prevent-abbreviations */
import { IColumn } from '@fluentui/react'
import get from 'get-value'
import React, { useMemo } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject, TimeEntry } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { DurationDisplay } from './DurationDisplay'
import { TimeColumn } from './TimeColumn'
import { TitleColumn } from './TitleColumn'
import { IEventListProps } from './types'
import { ITitleColumnProps } from './TitleColumn/types'

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
const createTitleColumnDef = (props: IEventListProps, name: string): IColumn => {
  const titleColumnProps: Partial<ITitleColumnProps> = {
    ...(isBrowser && props.titleColumn?.browser),
    ...(isMobile && props.titleColumn?.mobile),
    ...props,
  }
  return  createColumnDef<EventObject>(
    'title',
    name,
    { ...getSizing(props, 'title', 320, 400), isMultiline: true },
    (event) => <TitleColumn {...titleColumnProps} event={event} />
  )
}

/**
 * Time column
 *
 * @param props - Props
 * @param name - Name
 */
const createTimeColumnDef = (props: IEventListProps, name: string): IColumn =>
  createColumnDef<TimeEntry>(
    'time',
    name,
    { ...getSizing(props, 'time', 90, 90) },
    (event) => <TimeColumn {...props} event={event} />
  )

/**
 * Duration column
 *
 * @param props - Props
 * @param name - Name
 */
const createDurationColumnDef = (
  props: IEventListProps,
  name: string
): IColumn =>
  createColumnDef<TimeEntry>(
    'duration',
    name,
    { ...getSizing(props, 'duration', 75, 75) },
    (event) => <DurationDisplay event={event} />
  )

/**
 * Hook that returns the columns for the `EventList` component.
 *
 * @param props Props for the `EventList` component
 *
 * @category EventList
 */
export function useColumns(props: IEventListProps) {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        createTitleColumnDef(props, t('common.titleLabel')),
        props.useTimeColumn && createTimeColumnDef(props, t('common.timeLabel')),
        isBrowser && createDurationColumnDef(props, t('common.durationLabel')),
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
