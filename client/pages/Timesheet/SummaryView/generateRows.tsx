import $date from 'DateUtils'
import { IColumn } from '@fluentui/react'
import { EventObject, Project } from 'types'
import { unique } from 'underscore'

/**
 * Generate rows from events and columns
 *
 * @param events - Events
 * @param columns - Columns
 */
export function generateRows(events: EventObject[], columns: IColumn[]) {
  const projects = unique(
    events.map((event_) => event_.project),
    (p: Project) => p.tag
  )
  return projects.map((project) => {
    const projectEvents = events.filter(
      (event) => event.project.tag === project.tag
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
