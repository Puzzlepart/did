import { IColumn } from '@fluentui/react'
import $date from 'DateUtils'
import { TFunction } from 'react-i18next'
import { EventObject, Project } from 'types'
import _ from 'underscore'

/**
 * Generate rows from events and columns
 *
 * @param events - Events
 * @param columns - Columns
 * @param t - Translate function
 */
export function generateRows(
  events: EventObject[],
  columns: IColumn[],
  t: TFunction
) {
  const projects = [
    ..._.unique(
      _.filter(
        events.map((event_) => event_.project),
        (p) => !!p
      ),
      (p: Project) => p?.tag
    ),
    { name: t('common.unconfirmedHours'), customer: { name: '' }, tag: null }
  ]
  return projects.map((project) => {
    const projectEvents = events.filter(
      (event) =>
        event.project?.tag === project.tag || (!project.tag && !event.project)
    )
    return [...columns].splice(1, columns.length - 2).reduce(
      (object, col) => {
        const sum = [...projectEvents]
          .filter(
            (event) =>
              $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
              col.fieldName
          )
          .reduce((sum, event) => (sum += event.duration), 0)
        object[col.fieldName] = sum
        object.sum += sum
        return object
      },
      {
        sum: 0,
        project,
        customer: project.customer
      }
    )
  })
}
