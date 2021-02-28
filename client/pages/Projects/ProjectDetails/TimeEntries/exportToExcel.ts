import { TFunction } from 'i18next'
import { Project } from 'types'
import { exportExcel } from 'utils/exportExcel'
import columns from '../columns'

/**
 * On export to Excel
 *
 * @param project - Project
 * @param timeentries - Time entries
 * @param t - Translate function
 */
export async function onExportExcel(
  project: Project,
  timeentries: any[],
  t: TFunction
) {
  const timestamp = new Date().toDateString().split(' ').join('-')
  const fileName = `TimeEntries-${project.tag.replace(
    /\s+/g,
    '-'
  )}-${timestamp}.xlsx`
  await exportExcel(timeentries, {
    columns: columns(t),
    fileName
  })
}
