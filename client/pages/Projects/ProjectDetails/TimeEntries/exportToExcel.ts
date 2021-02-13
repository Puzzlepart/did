import columns from '../columns'
import { exportExcel } from 'utils/exportExcel'
import { TFunction } from 'i18next'
import { Project } from 'types'

/**
 * On export to Excel
 *
 * @param {Project} project Project
 * @param {any[]} timeentries Time entries
 * @param {TFunction} t Translate function
 */
export async function onExportExcel(project: Project, timeentries: any[], t: TFunction) {
  const timestamp = new Date().toDateString().split(' ').join('-')
  const fileName = `TimeEntries-${project.tag.replace(/\s+/g, '-')}-${timestamp}.xlsx`
  await exportExcel(timeentries, {
    columns: columns(t),
    fileName
  })
}
