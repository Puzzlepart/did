import { IProjectTagProps } from 'components'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Project tag column definition for reports list
 */
export const projectTagColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, IProjectTagProps>(
    'project.tag',
    t('projects.keyFieldLabel'),
    {
      minWidth: 180,
      maxWidth: 200,
      renderAs: 'projectTag',
      createRenderProps: ({ project }) => ({
        project,
        size: 'small',
        displayIcon: true
      }),
      data: {
        isSortable: true
      }
    }
  )
