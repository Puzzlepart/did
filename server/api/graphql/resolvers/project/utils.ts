import get from 'get-value'
import { filter, find } from 'underscore'
import { Customer, LabelObject, Project } from '../types'

/**
 * Connects projects, customers and labels
 *
 * @param {Project[]} projects
 * @param {Customer[]} customers
 * @param {LabelObject[]} labels
 */
export function connectEntities(
  projects: Project[],
  customers: Customer[],
  labels: LabelObject[]
): Project[] {
  return projects
    .map((project) => ({
      ...project,
      customer: find(customers, (c) => c.key === project.customerKey),
      labels: filter(labels, (lbl) => {
        const str = get(project, 'labels', { default: '' })
        return str.indexOf(lbl.name) !== -1
      })
    }))
    .filter((p) => p.customer)
}
