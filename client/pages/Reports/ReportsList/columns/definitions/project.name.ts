import { IProjectLinkProps } from 'components'
import { ProjectFilter } from 'components/FilterPanel'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Project name column definition for reports list
 */
export const projectNameColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, IProjectLinkProps>(
    'project.name',
    t('common.project'),
    {
      minWidth: 100,
      maxWidth: 140,
      renderAs: 'projectLink',
      createRenderProps: ({ project }) => ({
        project,
        showIcon: false
      }),
      data: {
        isSortable: true,
        isGroupable: true,
        isFilterable: true,
        filterType: ProjectFilter
      }
    }
  )
